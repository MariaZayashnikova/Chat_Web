import React  from "react";
import { shallow, mount, render  } from 'enzyme';
import PageLogin from "./page-login";
import store from "../../store";

describe('Test Page Login', () => {
    it('Page Login have rendered correctly', () => {
        const pageLogin = render(<PageLogin store={store} />);
        expect(pageLogin).toMatchSnapshot();
    });
});