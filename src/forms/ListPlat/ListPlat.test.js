import React from "react";
import { shallow } from "enzyme";
import ListPlat from "./ListPlat";

describe("ListPlat", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<ListPlat />);
    expect(wrapper).toMatchSnapshot();
  });
});
