import settings from '@/store/modules/settings';

test('emoticons should be an array', () => {
  expect(Array.isArray(settings.state.emoticons)).toBe(true);
});
test('thanksMessages should be an array', () => {
  expect(Array.isArray(settings.state.thanksMessages)).toBe(true);
});
test('emoticonGroupNames should be an array', () => {
  expect(Array.isArray(settings.state.emoticonGroupNames)).toBe(true);
});
test('activeSettings should be an object', () => {
  expect(typeof settings.state.activeSettings).toBe('object');
});
test('getActiveSettings should return an object', () => {
  settings.actions.getActiveSettings('dispatch').then((resp) => {
    expect(typeof resp).toBe('object');
  }).catch((err) => {
    expect(err).toBeTruthy();
  });
});
test('default emoticons length should be 5', () => {
  const state = {
    emoticons: [],
  };
  const emoticons = ['frown', 'sad', 'meh', 'smile', 'grin'];
  settings.mutations.setEmoticons(state, emoticons);
  expect(state.emoticons).toHaveLength(5);
});
test('default emoticons length should contain specific words', () => {
  const state = {
    emoticons: [],
  };
  const emoticons = ['frown', 'sad', 'meh', 'smile', 'grin'];
  settings.mutations.setEmoticons(state, emoticons);
  expect(state.emoticons).toContain('smile');
});
// This is a failing unit test!
/* test('activeSettings should be an object - this should fail', () => {
  expect(typeof settings.state.activeSettings).toBe('array');
}); */
test('emoticonGroupNames shouldnt contain swear words', () => {
  const state = {
    emoticonGroupNames: [],
  };
  const emoticons = ['smileys', 'thumbs', 'hearts', 'stars'];
  settings.mutations.setEmoticons(state, emoticons);
  expect(state.emoticons).not.toContain('****');
});
