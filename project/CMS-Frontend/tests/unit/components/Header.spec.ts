import { expect } from "chai";
import { shallowMount } from "@vue/test-utils";
import Header from "@/components/Header.vue";

describe("Header.vue", () => {
  it("renders title should contain Clinic Management System", () => {
    const title: String = "Clinic Management System";
    const wrapper = shallowMount(Header);
    expect(wrapper.text()).to.include(title);
  });
});
