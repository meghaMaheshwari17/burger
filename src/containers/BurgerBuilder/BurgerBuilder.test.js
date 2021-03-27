import {BurgerBuilder} from './BurgerBuilder';
import React from 'react';
import {configure,shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';


//to connect enzyme to the app
configure({adapter:new Adapter()})

//testing containers

describe('<BurgerBuilder/>',()=>{
    let wrapper;
    beforeEach(()=>{
        wrapper=shallow(<BurgerBuilder onInitIngredients={()=>{}}/>)
    })
  it('should not render buildcontrols if ings props is not there',
  ()=>{
    wrapper.setProps({ings:{salad:0}});
    expect(wrapper.find(BuildControls)).toHaveLength(1);

  })
})
