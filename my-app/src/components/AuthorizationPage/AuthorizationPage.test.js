import React  from "react";
import { shallow, mount, render  } from 'enzyme';
import AuthorizationPage from "./AuthorizationPage";
import store from "../../store";

describe('Test Authorization Page', () => {
    it('Authorization Page have rendered correctly', () => {
        const pageLogin = render(<AuthorizationPage store={store} />);
        expect(pageLogin).toMatchSnapshot();
    });
});