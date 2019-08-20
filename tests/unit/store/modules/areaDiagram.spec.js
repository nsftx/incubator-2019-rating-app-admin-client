import areaDiagram from '@/store/modules/areaDiagram';

test('diagram data should be object', () => {
  expect(typeof areaDiagram.state.diagramData).toBe('object');
});

test('new rating should be object', () => {
  expect(typeof areaDiagram.state.newRating).toBe('object');
});

test('setDiagramData updates state with data in payload', () => {
  const diagramData = {
    error: false,
    data: [
      {
        time: '2019-08-11',
        ratings: [],
      },
      {
        time: '2019-08-12',
        ratings: [],
      },
    ],
    emoticons: [
      {
        id: 117,
        name: 'star 1',
        value: 1,
        symbol: 'far fa-star',
      },
      {
        id: 118,
        name: 'star 2',
        value: 2,
        symbol: 'far fa-star',
      },
      {
        id: 119,
        name: 'star 3',
        value: 3,
        symbol: 'far fa-star',
      },
    ],
  };
  areaDiagram.mutations.setDiagramData(areaDiagram.state, { diagramData });
  expect(areaDiagram.state.diagramData.diagramData).toEqual(diagramData);
  expect(areaDiagram.state.diagramData.diagramData.error).toBeFalsy();
  expect(areaDiagram.state.diagramData.diagramData.data.length).toEqual(2);
  expect(areaDiagram.state.diagramData.diagramData.emoticons.length).toEqual(3);
});

test('setNewRating updates state with rating in payload', () => {
  const newRating = {
    id: 18171,
    emoticonId: 128,
    time: '2019-08-19 11:23:25',
    settingId: 244,
    updatedAt: '2019-08-19T11:23:25.872Z',
    createdAt: '2019-08-19T11:23:25.872Z',
  };
  areaDiagram.mutations.setNewRating(areaDiagram.state, { newRating });
  expect(areaDiagram.state.newRating.newRating).toEqual(newRating);
});

test('returns data from state', () => {
  const getDiagramData = areaDiagram.getters.diagramData(areaDiagram.state);
  const getNewRating = areaDiagram.getters.newRating(areaDiagram.state);

  expect(getDiagramData).toEqual(areaDiagram.state.diagramData);
  expect(getNewRating).toEqual(areaDiagram.state.newRating);
});
