import { mount } from "@vue/test-utils";
import Avatar from "@/components/common/Avatar";

describe("Avatar with firstName and empty imgPath props ", () => {
  const wrapper = mount(Avatar, {
    props: {
      firstName: "Janusz",
    },
  });
  it("renders properly", () => {
    expect(wrapper.exists()).toBeTruthy();
  });
  it("displays first letter of name", () => {
    const avatarLetter = wrapper.get("[data-test='avatar-letter']");

    expect(avatarLetter.text()).toBe("J");
  });
  it("img tag does not exist in dom", () => {
    const avatarImg = wrapper.find("[data-test='avatar-image']");

    expect(avatarImg.exists()).toBeFalsy();
  });
});
describe("Avatar with firstName and path to in imgPath props ", () => {
  const wrapper = mount(Avatar, {
    props: {
      firstName: "Janusz",
      imgPath: "./avatar.png",
    },
  });
  it("renders properly", () => {
    expect(wrapper.exists()).toBeTruthy();
  });
  it("displays proper image", () => {
    const avatarImage = wrapper.get("[data-test='avatar-image']");

    expect(avatarImage.attributes().src).toBe("./avatar.png");
  });
  it("first letter of the name does not exist in dom", () => {
    const avatarLetter = wrapper.find("[data-test='avatar-letter']");
    expect(avatarLetter.exists()).toBeFalsy();
  });
});
