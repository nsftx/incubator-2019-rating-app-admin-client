import notifications from '@/store/modules/notifications';

test('validate state notifiactions value', () => {
  expect(typeof notifications.state.notifications).toBe('object');
})

test('setMessage updates state with message in payload', () => {
  let message = { type: 'success', text: 'Congratulations' };
  notifications.mutations.setMessage(notifications.state, { message });
  expect(notifications.state.notifications.message).toEqual(message);
  expect(notifications.state.notifications.message.type).toEqual(message.type);
  expect(notifications.state.notifications.message.text).toEqual(message.text);
});

test('returns data from state', () => {
  const getNotifications = notifications.getters.notifications(notifications.state);

  expect(getNotifications).toEqual(notifications.state.notifications);
  expect(getNotifications.type).toEqual(notifications.state.notifications.type);
  expect(getNotifications.text).toEqual(notifications.state.notifications.text);
});
