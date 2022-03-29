import mock from '../axiosMock';

let MOCK_CONFIG = {
  subscriptionOn: true,
  email: 'sdf',
  searchingPhrase: 'react',
  filterString: 'asdasd',
  period: 'once a week'
};

function verifyApiKey(Authorization) {
  const key = Authorization.match(/(?:Basic\s)(.*)/)[1];
  return key === process.env.REACT_APP_API_KEY;
}

mock.onGet('/api/subscription').reply((request) => {
  const { Authorization } = request.headers;
  if (verifyApiKey(Authorization)) return [200, { config: MOCK_CONFIG }];
  else {
    return [401];
  }
});

mock.onPut('/api/subscription').reply((request) => {
  const { newConfig } = JSON.parse(request.data);
  MOCK_CONFIG = { ...MOCK_CONFIG, ...newConfig };
  return [200];
});
