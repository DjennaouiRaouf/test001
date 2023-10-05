import React from "react";
import { shallow } from "enzyme";
import DataGridView from "./DataGridView";

describe("DataGridView", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<DataGridView />);
    expect(wrapper).toMatchSnapshot();
  });
});
