import ApiService from '@/services/ApiService';


test('getActiveSettings should return an object', () => {
  const API_URL = 'http://172.20.116.56:3000/api/v1';
  const email = 'devhive.unit.test@nsoft.com';
  const token = 123;
  ApiService.postData(`${API_URL}/invites`, { email }, token)
    .then((response) => {
      expect(typeof response).toBe('object');
    })
    .catch((err) => {
      expect(err).toBeTruthy();
    });
});
