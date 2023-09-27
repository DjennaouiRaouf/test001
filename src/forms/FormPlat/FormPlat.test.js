import React from "react";
import { shallow } from "enzyme";
import FormPlat from "./FormPlat";

describe("FormPlat", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<FormPlat />);
    expect(wrapper).toMatchSnapshot();
  });
});
