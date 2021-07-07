import { mount } from "@vue/test-utils";
import Button from "@/components/common/Button";

test("Button with props renders properly", async () => {
  const wrapper = mount(Button, {
    props: {
      label: "Click me",
      isBig: true,
      isWarning: true,
    },
  });

  const button = wrapper.get("[data-test='button']");

  expect(button.classes()).toContain("px-40");
  expect(button.classes()).toContain("bg-warning");
  expect(button.text()).toBe("Click me");
});
