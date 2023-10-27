import axios from 'axios'

const API_BASE_URL = 'http://localhost:8000';

export async function signupAxios(context) {
  try {
    const response = await axios.post(`${API_BASE_URL}/login/signup`, context, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error in signupAxios:', error);
    throw error;
  }
}

export async function loginAxios(context) {
  try {
    const response = await axios.post(`${API_BASE_URL}/login/get-token`, context, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data.token;
  } catch (error) {
    console.error('Error in loginAxios:', error);
    throw error;
  }
}

export async function getTrainerPokemon(id=null) {
  let url = `${API_BASE_URL}/trainer/pokemon`

  if (id != null){
    url += `/${id}`
  }
  try {
    const response = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${localStorage.getItem("token")}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error in getTrainerPokemon:', error);
    throw error;
  }
}

export async function getGamePokemon(){
  try {
    const response = await axios.get(`${API_BASE_URL}/api/pokemon`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error in getGamePokemon', error)
    throw error;
    }
  }

export async function getTrainerItems(){
  try {
    let url = `${API_BASE_URL}/trainer/items`
    const response = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${localStorage.getItem("token")}`
      },
    })
    return response.data
  }
  catch (error) {
    console.error('Error fetching items:', error)
  }
}

export async function getEnemyPokemon(){
  try {
    let url = `${API_BASE_URL}/trainer/enemy-poke`
    const response = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${localStorage.getItem("token")}`
      },
    })

    return response.data
  }
  catch (error) {
    console.error('Error in getEnemyPokemon:', error)
    throw error;
  }
}

export async function trainerRun() {
  try {
    let url = `${API_BASE_URL}/trainer/run`
    const response = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${localStorage.getItem("token")}`
      },
    })
    return response.data
  } catch (error) {
    console.error('Error in trainerRun:', error)
    throw error;
  }
}

export async function replenishShop() {
  try {
    let url = `${API_BASE_URL}/trainer/replenish-shop`
    const response = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${localStorage.getItem("token")}`
      },
    })
    return response.data
  } catch (error) {
    console.error('Error in replenishShop:', error)
    throw error;
  }
}

export async function getFirstPokemon(){
  try {
    let url = `${API_BASE_URL}/trainer/first-poke`
    
    const response = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${localStorage.getItem("token")}`
      },
    })

    return response.data
  } catch (error) {
    console.error('Error in getFirstPokemon', error)
    throw error
  }
  }

  export async function updateBattleResults(selectPokemon, battle_result, money, experience) {
    try {

      const trainerData = {
        trainer_data: {
          selectPokemon: selectPokemon,
          battle_result: battle_result,
          money: money,
          experience: experience

        }
      }
      // const trainerData = {
      //   trainer_data: {
      //     pokemon_id: selectPokemon.id,
      //     current_health: selectPokemon.health,
      //     experience: experience,
      //     battle_result: battle_result,
      //     money: money,
      //   }
      // };

      const response = await axios.put(`${API_BASE_URL}/trainer/battleResults`, trainerData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${localStorage.getItem("token")}`,
        },
      });
    
  
      return response.data;
    } catch (error) {
      console.error('Error in updateBattleResults:', error);
      throw error;
    }
  }

export async function updateItems(itemID, quantity) {
  try {
    const itemsUsed = {
      items_used: {
        [itemID]: quantity
      }
    }
    const response = await axios.put(`${API_BASE_URL}/items/update`, itemsUsed, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${localStorage.getItem("token")}`,
      }
    });
    return response.data;

  } catch (error) {
    console.error('Error in updateItems:', error)
    throw error
  }
  }

  export async function makeTransaction(item, quantity, action){
    try {
      const transactionData = {
        transaction: {
          "item_id": item.id,
          "item_qty": quantity,
          "action": action,
        }
      }
      console.log(transactionData, 'function called')
      const response = await axios.put(`${API_BASE_URL}/trainer/shop/transaction`, transactionData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${localStorage.getItem("token")}`,
        }
      });
      return response.data
    } catch (error) {
      console.error('Error in makeTransaction:', error)
      throw error
    }
  }

export async function getTrainer(){
  try {
    const response = await axios.get(`${API_BASE_URL}/trainer/`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${localStorage.getItem("token")}`,
      }
    });
    return response.data
  } catch (error) {
    console.error('Error in getTrainer:', error)
    throw error
  }
}

export async function getTrainerShop(){
  try {
    const response = await axios.get(`${API_BASE_URL}/trainer/shop`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${localStorage.getItem("token")}`,
      }
    });
    return response.data
  } catch (error) {
    console.error('Error in getTrainerShop:', error)
    throw error
  }
}
  