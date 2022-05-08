import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const baseApiURL = `http://${process.env.REACT_APP_API_URL}`;

function DashboardPage() {
  const [subscription, setSubscription] = useState(null);
  const { state } = useLocation();
  const navigate = useNavigate();

  async function saveChanges() {
    try {
      const response = await axios.put(
        `${baseApiURL}/subscription`,
        { subscription },
        { headers: { Authorization: `Bearer ${state.access_token}` } }
      );
      console.log("put request to subscription sent. response is ", response);
    } catch (e) {
      console.log("couldn't modify subscription because of error: ", e);
    }
  }

  async function exit() {
    navigate("/");
  }

  useEffect(() => {
    async function f() {
      try {
        const response = await axios.get(`${baseApiURL}/subscription`, {
          headers: { Authorization: `Bearer ${state.access_token}` },
        });
        if (response.status === 200) {
          setSubscription(response.data.subscription);
        }
        console.log("get request to subscription sent. response is ", response);
      } catch (e) {
        console.log("couldn't send request to api because of error: ", e);
      }
    }
    f();
  }, [state.access_token]);

  return subscription ? (
    <div className="container">
      <div>
        <input
          type="checkbox"
          checked={subscription.subscriptionOn}
          onChange={() => {
            setSubscription({
              ...subscription,
              subscriptionOn: !subscription.subscriptionOn,
            });
          }}
        ></input>
        <label>
          Рассылка{subscription.subscriptionOn ? " включена" : " выключена"}
        </label>
      </div>
      <div>
        <label>E-mail:</label>
        <input
          value={subscription.email}
          onChange={(e) =>
            setSubscription({ ...subscription, email: e.target.value })
          }
        ></input>
      </div>
      <div>
        <label>Поисковая фраза:</label>
        <input
          value={subscription.searchingPhrase}
          onChange={(e) =>
            setSubscription({
              ...subscription,
              searchingPhrase: e.target.value,
            })
          }
        ></input>
      </div>
      <div>
        <label>Фильтры:</label>
        <input
          value={subscription.filterString}
          onChange={(e) =>
            setSubscription({ ...subscription, filterString: e.target.value })
          }
        ></input>
      </div>
      <div>
        <label>Периодичность:</label>
        <input
          value={subscription.period}
          onChange={(e) =>
            setSubscription({ ...subscription, period: e.target.value })
          }
        ></input>
      </div>
      <div>
        <button onClick={saveChanges}>Сохранить изменения</button>
        <button onClick={exit}>Выйти</button>
      </div>
    </div>
  ) : (
    <></>
  );
}

export default DashboardPage;
