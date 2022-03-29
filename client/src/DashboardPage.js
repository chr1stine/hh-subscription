import { useEffect, useState } from 'react';
import axios from 'axios';
// import './_mock_/subscription';

const baseURL = `http://${process.env.REACT_APP_API_DOMAIN}:${process.env.REACT_APP_API_PORT}`

function DashboardPage() {
  const [config, setConfig] = useState(null);

  async function saveChanges() {
    const response = await axios.put(
      `${baseURL}/subscription`,
      { config },
      { headers: { Authorization: `Basic ${process.env.REACT_APP_API_KEY}` } }
    );
    console.log('put request to subscription sent. response is ', response);
  }

  useEffect(() => {
    async function f() {
      try {
        const response = await axios.get(`${baseURL}/subscription`, {
          headers: { Authorization: `Basic ${process.env.REACT_APP_API_KEY}` }
        });
        if (response.status === 200) {
          setConfig(response.data.config);
        }
        console.log('get request to subscription sent. response is ', response);
      } catch (e) {
        console.log(e);
      }
    }
    f();
  }, []);
  
  return config ? (
    <div className="container">
      <div>
        <input
          type="checkbox"
          checked={config.subscriptionOn}
          onChange={() => {setConfig({ ...config, subscriptionOn: !config.subscriptionOn });console.log(config.subscriptionOn)}}
        ></input>
        <label>Рассылка{config.subscription ? ' включена' : ' выключена'}</label>
      </div>
      <div>
        <label>E-mail:</label>
        <input value={config.email} onChange={(e) => setConfig({ ...config, email: e.target.value })}></input>
      </div>
      <div>
        <label>Поисковая фраза:</label>
        <input
          value={config.searchingPhrase}
          onChange={(e) => setConfig({ ...config, searchingPhrase: e.target.value })}
        ></input>
      </div>
      <div>
        <label>Фильтры:</label>
        <input
          value={config.filterString}
          onChange={(e) => setConfig({ ...config, filterString: e.target.value })}
        ></input>
      </div>
      <div>
        <label>Периодичность:</label>
        <input value={config.period} onChange={(e) => setConfig({ ...config, period: e.target.value })}></input>
      </div>
      <button onClick={saveChanges}>Сохранить изменения</button>
    </div>
  ) : (
    <></>
  );
}

export default DashboardPage;
