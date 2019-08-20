import pieChart from '@/store/modules/pieChart';

test('pieChartData should not be undefined', () => {
  const state = {
    pieChartData: {},
  };
  const date = new Date().toISOString().substr(0, 10);
  pieChart.mutations.setPieChartData(state, { date });
  expect(state.pieChartData).toBeDefined();
});
test('date should have specific length (10)', () => {
  const date = new Date().toISOString().substr(0, 10);
  expect(date).toHaveLength(10);
});
test('date should match the specific regex', () => {
  const date = new Date().toISOString().substr(0, 10);
  expect(date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
});
test('data should not be null', () => {
  const state = {
    pieChartData: {},
  };
  const date = new Date().toISOString().substr(0, 10);
  pieChart.mutations.setPieChartData(state, { date });
  expect(state.pieChartData.data).not.toBeNull();
});
test('pieChartData should be an object', () => {
  expect(typeof pieChart.state.pieChartData).toBe('object');
});
test('error should be false in response data', () => {
  const state = {
    pieChartData: {},
  };
  const data = {
    error: false,
    data: [
      {
        id: 127,
        name: 'thumbs 1',
        value: 1,
        symbol: 'far fa-thumbs-up',
        count: 10,
      },
      {
        id: 128,
        name: 'thumbs 2',
        value: 2,
        symbol: 'far fa-thumbs-up',
        count: 20,
      }],
  };
  pieChart.mutations.setPieChartData(state, data);
  expect(state.pieChartData.error).toBe(false);
});
test('count in data should return number', () => {
  const state = {
    pieChartData: {},
  };
  const data = {
    error: false,
    data:
      {
        id: 127,
        name: 'thumbs 1',
        value: 1,
        symbol: 'far fa-thumbs-up',
        count: 10,
      },
  };
  pieChart.mutations.setPieChartData(state, data);
  expect(state.pieChartData.data.count).not.toBeNaN();
});
