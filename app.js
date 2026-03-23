const { useState, useEffect } = React;

const SUPABASE_URL = 'https://bqlnylxkteokoqmzzqoy.supabase.co'; 
const SUPABASE_ANON_KEY = 'sb_publishable_xL_u-TyJU_ogsM-KEilSHQ_T860SJd8';
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const eliteRoster = [
    { id: 'm1', name: 'Spider-Man', universe: 'Marvel', imageUrl: 'https://bqlnylxkteokoqmzzqoy.supabase.co/storage/v1/object/public/multiverse_assets/spiderman.jpg' },
    { id: 'sw1', name: 'Darth Vader', universe: 'Star Wars', imageUrl: 'https://bqlnylxkteokoqmzzqoy.supabase.co/storage/v1/object/public/multiverse_assets/vader.jpg' },
    { id: 'p1', name: 'Jack Sparrow', universe: 'Pirates of the Caribbean', imageUrl: 'https://bqlnylxkteokoqmzzqoy.supabase.co/storage/v1/object/public/multiverse_assets/jacksparrow.jpg' },
    { id: 'cr1', name: 'Ben Tennyson', universe: 'Omniverse', imageUrl: 'https://bqlnylxkteokoqmzzqoy.supabase.co/storage/v1/object/public/multiverse_assets/ben10.jpg' },
    { id: 'cr2', name: 'Rex', universe: 'Generator Rex', imageUrl: 'https://bqlnylxkteokoqmzzqoy.supabase.co/storage/v1/object/public/multiverse_assets/generatorrex.jpg' },
    { id: 'cr3', name: 'Jake Long', universe: 'American Dragon', imageUrl: 'https://bqlnylxkteokoqmzzqoy.supabase.co/storage/v1/object/public/multiverse_assets/jake.jpg' },
    { id: 'sw2', name: 'Starkiller', universe: 'Star Wars', imageUrl: 'https://bqlnylxkteokoqmzzqoy.supabase.co/storage/v1/object/public/multiverse_assets/starkiller.jpg' },
    { id: 'm2', name: 'Iron Man', universe: 'Marvel', imageUrl: 'https://bqlnylxkteokoqmzzqoy.supabase.co/storage/v1/object/public/multiverse_assets/ironman.jpg' },
    { id: 'd1', name: 'Sora', universe: 'Kingdom Hearts', imageUrl: 'https://bqlnylxkteokoqmzzqoy.supabase.co/storage/v1/object/public/multiverse_assets/sora.jpg' },
    { id: 'm3', name: 'Wolverine', universe: 'Marvel', imageUrl: 'https://bqlnylxkteokoqmzzqoy.supabase.co/storage/v1/object/public/multiverse_assets/wolverine.jpg' },
    { id: 'dc1', name: 'Nightwing', universe: 'DC', imageUrl: 'https://bqlnylxkteokoqmzzqoy.supabase.co/storage/v1/object/public/multiverse_assets/nightwing.jpg' },
    { id: 'm4', name: 'Reed Richards', universe: 'Marvel', imageUrl: 'https://bqlnylxkteokoqmzzqoy.supabase.co/storage/v1/object/public/multiverse_assets/reed.jpg' },
    { id: 'ps1', name: 'Ratchet', universe: 'Ratchet & Clank', imageUrl: 'https://bqlnylxkteokoqmzzqoy.supabase.co/storage/v1/object/public/multiverse_assets/ratchet.jpg' },
    { id: 'x1', name: 'Master Chief', universe: 'Halo', imageUrl: 'https://bqlnylxkteokoqmzzqoy.supabase.co/storage/v1/object/public/multiverse_assets/halo.jpg' },
    { id: 'n1', name: 'Samus', universe: 'Metroid', imageUrl: 'https://bqlnylxkteokoqmzzqoy.supabase.co/storage/v1/object/public/multiverse_assets/samus.jpg' },
    { id: 'c1', name: 'Prophet', universe: 'Crysis', imageUrl: 'https://bqlnylxkteokoqmzzqoy.supabase.co/storage/v1/object/public/multiverse_assets/prophet.jpg' },
    { id: 'm4', name: 'Dr Doom', universe: 'Marvel', imageUrl: 'https://bqlnylxkteokoqmzzqoy.supabase.co/storage/v1/object/public/multiverse_assets/doom.jpg' },
    { id: 'f1', name: 'Cloud', universe: 'Final Fantasy VII', imageUrl: 'https://bqlnylxkteokoqmzzqoy.supabase.co/storage/v1/object/public/multiverse_assets/cloud.jpg' },
    { id: 'n2', name: 'Mega Man X', universe: 'Mega Man', imageUrl: 'https://bqlnylxkteokoqmzzqoy.supabase.co/storage/v1/object/public/multiverse_assets/megaman.jpg' },
    { id: 'n3', name: 'Zero', universe: 'Mega Man', imageUrl: 'https://bqlnylxkteokoqmzzqoy.supabase.co/storage/v1/object/public/multiverse_assets/zero.jpg' },
    { id: 'ps2', name: 'Clank', universe: 'Ratchet & Clank', imageUrl: 'https://bqlnylxkteokoqmzzqoy.supabase.co/storage/v1/object/public/multiverse_assets/clank.jpg' },
    { id: 's1', name: 'Sonic', universe: 'Sonic the Hedgehog', imageUrl: 'https://bqlnylxkteokoqmzzqoy.supabase.co/storage/v1/object/public/multiverse_assets/sonic.jpg' },
    { id: 's2', name: 'Shadow', universe: 'Sonic the Hedgehog', imageUrl: 'https://bqlnylxkteokoqmzzqoy.supabase.co/storage/v1/object/public/multiverse_assets/shadow.jpg' },
];

const SecurityModal = ({ message, onClose }) => {
    if (!message) return null; 

    return (
        <div className="security-overlay">
            <div className="security-modal">
                <div className="security-icon">🛑</div>
                <h2 className="security-title">ACCESS DENIED</h2>
                <p className="security-message">{message}</p>
                <button className="security-dismiss-btn" onClick={onClose}>
                    ACKNOWLEDGE
                </button>
            </div>
        </div>
    );
};

const CharacterCard = ({ character, isRecruited, onRecruitSuccess, triggerAlert }) => {
    const [isTransmitting, setIsTransmitting] = useState(false);

    const handleRecruit = async () => {
        setIsTransmitting(true); 
        try {
            const { error } = await supabaseClient
                .from('multiverse_vault')
                .insert([{ name: character.name, universe: character.universe, image_url: character.imageUrl }]);

            if (error) throw error;
            if (onRecruitSuccess) onRecruitSuccess();
            
        } catch (error) {
            console.error("Insertion failed:", error.message);
            // MODAL TRIGGER 1
            triggerAlert("Admin clearance is required to recruit assets to the Vault.");
        } finally {
            setIsTransmitting(false);
        }
    };

    let buttonClass = "recruit-btn";
    let buttonText = "RECRUIT TO VAULT";
    let isDisabled = false;

    if (isRecruited) {
        buttonClass += " secured";
        buttonText = "ALREADY RECRUITED";
        isDisabled = true;
    } else if (isTransmitting) {
        buttonClass += " transmitting";
        buttonText = "TRANSMITTING...";
        isDisabled = true;
    }

    return (
        <div className="roster-card">
            <img src={character.imageUrl} alt={character.name} />
            <h3>{character.name}</h3>
            <p>{character.universe}</p>
            <button className={buttonClass} onClick={handleRecruit} disabled={isDisabled}>
                {buttonText}
            </button>
        </div>
    );
};

const VaultCard = ({ character, onRefresh, triggerAlert }) => {
    const [isDischarging, setIsDischarging] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editName, setEditName] = useState(character.name);
    const [editUniverse, setEditUniverse] = useState(character.universe);
    const [isUpdating, setIsUpdating] = useState(false);

    const handleDischarge = async () => {
        const confirmPurge = window.confirm(`Are you sure you want to discharge ${character.name}?`);
        if (!confirmPurge) return;

        setIsDischarging(true);
        try {

            const { data, error } = await supabaseClient
                .from('multiverse_vault')
                .delete()
                .eq('id', character.id)
                .select(); 

            if (error) throw error;
            
            if (!data || data.length === 0) {
                setIsDischarging(false);
                triggerAlert("YOU ARE FORBIDDEN TO DO THIS. Admin clearance is required to discharge assets.");
                return; 
            }

            if (onRefresh) onRefresh();

        } catch (error) {
            console.error("Discharge failed:", error.message);
            setIsDischarging(false);
            triggerAlert("YOU ARE FORBIDDEN TO DO THIS. Admin clearance is required to discharge assets.");
        }
    };

    const handleUpdate = async () => {
        setIsUpdating(true);
        try {

            const { data, error } = await supabaseClient
                .from('multiverse_vault')
                .update({ name: editName, universe: editUniverse })
                .eq('id', character.id)
                .select(); 

            if (error) throw error;
            
            if (!data || data.length === 0) {
                setIsUpdating(false);
                triggerAlert("YOU ARE FORBIDDEN TO DO THIS. Admin clearance is required to overwrite dossiers.");
                return; 
            }

            setIsEditing(false); 
            if (onRefresh) onRefresh(); 

        } catch (error) {
            console.error("Update failed:", error.message);
            setIsUpdating(false);
            triggerAlert("YOU ARE FORBIDDEN TO DO THIS. Admin clearance is required to overwrite dossiers.");
        }
    };

    return (
        <div className="roster-card vault-card">
            <img src={character.image_url} alt={character.name} />
            
            {isEditing ? (
                <div style={{ marginTop: '15px' }}>
                    <input type="text" className="edit-input" value={editName} onChange={(e) => setEditName(e.target.value)} />
                    <input type="text" className="edit-input" value={editUniverse} onChange={(e) => setEditUniverse(e.target.value)} />
                    <button className="update-btn" onClick={handleUpdate} disabled={isUpdating}>
                        {isUpdating ? 'OVERRIDING...' : 'SAVE OVERRIDE'}
                    </button>
                    <button className="discharge-btn" onClick={() => setIsEditing(false)} style={{ marginTop: '0', borderColor: '#555', color: '#888' }}>
                        CANCEL
                    </button>
                </div>
            ) : (
                <>
                    <h3>{character.name}</h3>
                    <p>{character.universe}</p>
                    <div className="vault-status">STATUS: DEPLOYED</div>
                    <button className="update-btn" onClick={() => setIsEditing(true)} style={{ background: 'transparent', color: '#00aaff', marginTop: '10px' }}>
                        EDIT DOSSIER
                    </button>
                    <button className="discharge-btn" onClick={handleDischarge} disabled={isDischarging}>
                        {isDischarging ? 'PURGING...' : 'DISCHARGE ASSET'}
                    </button>
                </>
            )}
        </div>
    );
};

function App() {
  const [connectionStatus, setConnectionStatus] = useState('Verifying connection...');
  const [currentView, setCurrentView] = useState('ROSTER');
  const [vaultTeam, setVaultTeam] = useState([]);
  const [isLoadingVault, setIsLoadingVault] = useState(false);
  
  const [securityAlert, setSecurityAlert] = useState(null);

  const fetchVaultTeam = async () => {
      setIsLoadingVault(true);
      try {
          const { data, error } = await supabaseClient.from('multiverse_vault').select('*');
          if (error) throw error;
          setVaultTeam(data);
      } catch (error) {
          console.error("Vault retrieval failed:", error.message);
      } finally {
          setIsLoadingVault(false);
      }
  };

  useEffect(() => {
    async function initializeSystem() {
      try {
        const { error } = await supabaseClient.from('multiverse_vault').select('*').limit(1);
        if (error) throw error;
        setConnectionStatus('🟢 Vault Online & Secured');
        await fetchVaultTeam();
      } catch (error) {
        setConnectionStatus('🔴 Vault Offline');
      }
    }
    initializeSystem();
  }, []);

  return (
    <div>
      <SecurityModal message={securityAlert} onClose={() => setSecurityAlert(null)} />

      <header className="command-header">
        <div>
            <h1>Project Armageddon</h1>
            <p>MULTIVERSAL RECRUITMENT PROTOCOL</p>
        </div>
        
        <div className="nav-controls">
            <button className={`nav-btn ${currentView === 'ROSTER' ? 'active-roster' : 'inactive-roster'}`} onClick={() => setCurrentView('ROSTER')}>
                TARGET ROSTER
            </button>
            <button className={`nav-btn ${currentView === 'VAULT' ? 'active-vault' : 'inactive-vault'}`} onClick={() => setCurrentView('VAULT')}>
                SECURED VAULT
            </button>
        </div>

        <div className="server-status">
            SERVER STATUS<br/>{connectionStatus}
        </div>
      </header>

      <div className="roster-grid">
          {currentView === 'ROSTER' && (
              eliteRoster.map(char => {
                  const alreadyInVault = vaultTeam.some(vaultObj => vaultObj.name === char.name);
                  return (
                      <CharacterCard 
                          key={char.id} 
                          character={char} 
                          isRecruited={alreadyInVault} 
                          onRecruitSuccess={fetchVaultTeam} 
                          triggerAlert={setSecurityAlert} 
                      />
                  );
              })
          )}

          {currentView === 'VAULT' && isLoadingVault && <h2 className="system-message msg-loading">ACCESSING CLOUD STORAGE...</h2>}
          {currentView === 'VAULT' && !isLoadingVault && vaultTeam.length === 0 && <h2 className="system-message msg-empty">VAULT IS EMPTY. RECRUIT TARGETS FIRST.</h2>}
          {currentView === 'VAULT' && !isLoadingVault && vaultTeam.length > 0 && (
              vaultTeam.map(char => (
                  <VaultCard 
                      key={char.id} 
                      character={char} 
                      onRefresh={fetchVaultTeam} 
                      triggerAlert={setSecurityAlert} 
                  />
              ))
          )}
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);