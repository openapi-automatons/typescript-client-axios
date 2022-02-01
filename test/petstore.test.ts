import axios from "axios";

import MockAdapter from "axios-mock-adapter";
import {PetsApi} from "./generates/petstore";

describe('petstore', () => {
  test('showPetById', async () => {
    const mock = new MockAdapter(axios);
    mock.onGet("/pets/1").reply(200, {
      id: 1, name: "Lassie"
    });

    const api = new PetsApi({axios});
    const {data} = await api.showPetById('1')
    expect(data).toEqual({id: 1, name: 'Lassie'})
  })
});

