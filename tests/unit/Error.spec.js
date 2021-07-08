import { mount } from "@vue/test-utils";
import Error from "@/components/common/Error.vue";

test("Error works", () => {
  const errorComponent = mount(Error, {
    props: {
      message: "xxx",
      classes: "class1 class2",
    },
  });

  const todo = errorComponent.get('[data-test="error"]');

  expect(todo.text()).toBe("xxx");
  expect(todo.classes()).toContain("class1", "class2");
});
