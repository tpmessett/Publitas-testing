import {mount, shallowMount} from '@vue/test-utils';
import cart from '@/views/cart.vue'
import router from '@/router'

describe('cart.vue', () => {
  it('renders empty cart message when no params passed', () => {
    const wrapper = shallowMount(cart);
    expect(wrapper.text()).toContain('Your Cart Is Empty');
  });

  // need to mock up apollo queries to make this work.
  // it('renders a cart when params exist', async () => {
  //   router.push('/?%5B%7B%22id%22%3A%228109412516122%22%2C%22quantity%22%3A1%2C%22variant%22%3A%2244481714192666%22%7D%5D')
  //   await router.isReady()
  //   const wrapper = mount(cart);
  //   expect(wrapper.text()).toContain('Your Cart:')
  //   expect(wrapper.find('button').toBe(true))
  // })

  // it('works well with 100 items', () => {

  // })
});

