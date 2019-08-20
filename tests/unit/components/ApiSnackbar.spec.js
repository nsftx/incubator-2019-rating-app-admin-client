import ApiSnackbar from '@/components/ApiSnackbar.vue';

test("validate snackbar value", () => {
  expect(ApiSnackbar.snackbar).toBeFalsy();
});
