import React from "react";
import { shallow } from "enzyme";
import EditPlat from "./EditPlat";

describe("EditPlat", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<EditPlat />);
    expect(wrapper).toMatchSnapshot();
  });
});
