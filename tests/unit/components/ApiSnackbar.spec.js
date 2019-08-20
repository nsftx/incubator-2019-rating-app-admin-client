import ApiSnackbar from '@/components/ApiSnackbar.vue';

test("Snackbar value should be false", () => {
  expect(ApiSnackbar.snackbar).toBeFalsy();
});
