import React from 'react';
import {configure,shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

//to connect enzyme to the app
configure({adapter:new Adapter()})

//test
describe('<NavigationItems/>',()=>{
    let wrapper;
    beforeEach(()=>{
        wrapper=shallow(<NavigationItems/>);
    });
    it('should render two <NavigationItem/> elements if not authenticated',
    ()=>{
      
       expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });
    it('should render three <NavigationItem/> elements if  authenticated',
    ()=>{
    //    const wrapper=shallow(<NavigationItems isAuth/>);
    //wrapper=shallow(<NavigationItems isAuth/>);  
     wrapper.setProps({isAuth:true});
    expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });
    it('should render logout link only if authenticated',
    ()=>{
        wrapper.setProps({isAuth:true});
     expect(wrapper.contains(<NavigationItem navLink="/logout">
       Log Out</NavigationItem>)).toEqual(true);
    });
   
})

//shallow doesn't deeply renders
//enzyme allows us to render only navigation item 
//to check instead of rendering the whole react app to the browser
// to check if the navigation items is working or not
//each test runs independent from others
//can find more methods on the official documentation page of jest
