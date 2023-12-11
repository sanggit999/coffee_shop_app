import {create} from 'zustand';
import {produce} from 'immer';
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CoffeeData from '../data/CoffeeData';
import BeansData from '../data/BeansData';

export const useStore = create(
  persist(
    (set, get) => ({
      CoffeeList: CoffeeData,
      BeansList: BeansData,
      CartPrice: 0,
      CartList: [],
      FavouritesList: [],
      OrderHistoryList: [],
      addToCart: (cartItem: any) =>
        set(
          produce(state => {
            // Kiểm tra xem mục đã có trong giỏ hàng chưa
            let found = false;
            for (let i = 0; i < state.CartList.length; i++) {
              if (state.CartList[i].id == cartItem.id) {
                found = true;
                // Kiểm tra xem kích thước của mục có khớp với kích thước hiện có trong giỏ hàng không
                let size = false;
                for (let j = 0; j < state.CartList[i].prices.length; j++) {
                  if (
                    state.CartList[i].prices[j].size == cartItem.prices[0].size
                  ) {
                    size = true;
                    // Nếu kích thước khớp, tăng số lượng
                    state.CartList[i].prices[j].quantity++;
                    break;
                  }
                }
                // Nếu kích thước không khớp, thêm một kích thước mới vào mục
                if (size == false) {
                  state.CartList[i].prices.push(cartItem.prices[0]);
                }
                // Sắp xếp giá theo thứ tự giảm dần
                state.CartList[i].prices.sort((a: any, b: any) => {
                  if (a.size > b.size) {
                    return -1;
                  }
                  if (a.size < b.size) {
                    return 1;
                  }
                  return 0;
                });
                break;
              }
            }
            // Nếu mục không có trong giỏ hàng, thêm vào
            if (found == false) {
              state.CartList.push(cartItem);
            }
          }),
        ),
      calculaCartPrice: () =>
        set(
          produce(state => {
            let totalPrice = 0;
            // Duyệt qua mỗi mục trong giỏ hàng
            for (let i = 0; i < state.CartList.length; i++) {
              let tempPrice = 0;
              // Duyệt qua mỗi kích thước của mục
              for (let j = 0; j < state.CartList[i].prices.length; j++) {
                // Tính tổng giá của kích thước và số lượng tương ứng
                tempPrice =
                  tempPrice +
                  parseFloat(state.CartList[i].prices[j].price) *
                    state.CartList[i].prices[j].quantity;
              }
              // Gán giá trị tổng giá cho mục
               state.CartList[i].itemPrice = tempPrice.toFixed(3).replace(/\B(?=(\d{3})+(?!\d))/g,".");
      
              // Cộng tổng giá vào tổng giá của giỏ hàng
              totalPrice += tempPrice;
            }
            // Gán tổng giá cho trạng thái giỏ hàng
             state.CartPrice = totalPrice.toFixed(3).toString().replace(/\B(?=(\d{3})+(?!\d))/g,".");
           
          }),
        ),
      addToFavoriteList: (type: string, id: string) =>
        set(
          produce(state => {
            // Kiểm tra loại mục (Coffee hoặc Bean)
            if (type == 'Coffee') {
              // Duyệt qua danh sách cà phê
              for (let i = 0; i < state.CoffeeList.length; i++) {
                // Tìm mục trong danh sách cà phê với ID tương ứng
                if (state.CoffeeList[i].id == id) {
                  // Kiểm tra nếu mục chưa được đánh dấu là yêu thích
                  if (state.CoffeeList[i].favourite == false) {
                    // Đánh dấu mục là yêu thích
                    state.CoffeeList[i].favourite = true;
                    // Thêm mục vào đầu danh sách yêu thích
                    state.FavouritesList.unshift(state.CoffeeList[i]);
                  }
                  break; // Dừng vòng lặp sau khi thêm mục vào danh sách yêu thích
                }
              }
            } else if (type == 'Bean') {
              // Duyệt qua danh sách hạt cà phê
              for (let i = 0; i < state.BeansList.length; i++) {
                // Tìm mục trong danh sách hạt cà phê với ID tương ứng
                if (state.BeansList[i].id == id) {
                  // Kiểm tra nếu mục chưa được đánh dấu là yêu thích
                  if (state.BeansList[i].favourite == false) {
                    // Đánh dấu mục là yêu thích
                    state.BeansList[i].favourite = true;
                    // Thêm mục vào đầu danh sách yêu thích
                    state.FavouritesList.unshift(state.BeansList[i]);
                  }
                  break; // Dừng vòng lặp sau khi thêm mục vào danh sách yêu thích
                }
              }
            }
          }),
        ),
      deleteFromFavorite: (type: string, id: string) =>
        set(
          produce(state => {
            // Kiểm tra loại mục (Coffee hoặc Bean)
            if (type == 'Coffee') {
              // Duyệt qua danh sách cà phê
              for (let i = 0; i < state.CoffeeList.length; i++) {
                // Tìm mục trong danh sách cà phê với ID tương ứng
                if (state.CoffeeList[i].id == id) {
                  // Kiểm tra nếu mục  được đánh dấu là yêu thích
                  if (state.CoffeeList[i].favourite == true) {
                    // Bỏ đánh dấu mục là yêu thích
                    state.CoffeeList[i].favourite = false;
                  }
                  break; // Dừng vòng lặp sau khi thêm mục vào danh sách yêu thích
                }
              }
            } else if (type == 'Bean') {
              // Duyệt qua danh sách hạt cà phê
              for (let i = 0; i < state.BeansList.length; i++) {
                // Tìm mục trong danh sách hạt cà phê với ID tương ứng
                if (state.BeansList[i].id == id) {
                  // Kiểm tra nếu mục  được đánh dấu là yêu thích
                  if (state.BeansList[i].favourite == true) {
                    // Bỏ đánh dấu mục là yêu thích
                    state.BeansList[i].favourite = false;
                  }
                  break; // Dừng vòng lặp sau khi thêm mục vào danh sách yêu thích
                }
              }
            }
              // Tìm vị trí của mục trong danh sách yêu thích
            let spliceIndex = -1;
            for (let i = 0; i < state.FavouritesList.length; i++) {
              if (state.FavouritesList[i].id == id) {
                spliceIndex = i;
                break;
              }
            }
            // Nếu tìm thấy mục trong danh sách yêu thích, loại bỏ nó
            state.FavouritesList.splice(spliceIndex, 1);
          }),
        ),
      incrementCartItemQuantity: (id: string, size: string) =>
        set(
          produce(state => {
            // Duyệt qua từng mục trong giỏ hàng
            for (let i = 0; i < state.CartList.length; i++) {
              // Tìm mục trong giỏ hàng với ID tương ứng
              if (state.CartList[i].id == id) {
                // Duyệt qua từng kích thước của mục
                for (let j = 0; j < state.CartList[i].prices.length; j++) {
                  // Tìm kích thước tương ứng với size được chuyển vào hàm
                  if (state.CartList[i].prices[j].size == size) {
                    // Tăng số lượng của kích thước đó lên 1
                    state.CartList[i].prices[j].quantity++;
                    break; // Dừng vòng lặp sau khi tăng số lượng
                  }
                }
              }
            }
          }),
        ),
      decrementCartItemQuantity: (id: string, size: string) =>
        set(
          produce(state => {
            // Duyệt qua từng mục trong giỏ hàng
            for (let i = 0; i < state.CartList.length; i++) {
              // Tìm mục trong giỏ hàng với ID tương ứng
              if (state.CartList[i].id == id) {
                // Duyệt qua từng kích thước của mục
                for (let j = 0; j < state.CartList[i].prices.length; j++) {
                  // Tìm kích thước tương ứng với size được chuyển vào hàm
                  if (state.CartList[i].prices[j].size == size) {
                    // Kiểm tra nếu có nhiều hơn 1 kích thước
                    if (state.CartList[i].prices.length > 1) {
                      // Kiểm tra nếu số lượng lớn hơn 1
                      if (state.CartList[i].prices[j].quantity > 1) {
                        // Giảm số lượng của kích thước đó đi 1
                        state.CartList[i].prices[j].quantity--;
                      } else {
                        // Nếu số lượng là 1, xóa kích thước đó khỏi mảng prices
                        state.CartList[i].prices.splice(j, 1);
                      }
                    } else {
                      // Nếu chỉ có 1 kích thước
                      if (state.CartList[i].prices[j].quantity > 1) {
                        // Giảm số lượng của kích thước đó đi 1
                        state.CartList[i].prices[j].quantity--;
                      } else {
                        // Nếu số lượng là 1, xóa toàn bộ mục đó khỏi giỏ hàng
                        state.CartList.splice(i, 1);
                      }
                    }
                    break;
                  }
                }
              }
            }
          }),
        ),
      addOrderHistoryList: () =>
        set(
          produce(state => {
            // Tính tổng giá trị của giỏ hàng
            let temp = state.CartList.reduce(
              (accumulator: number, currentValue: any) =>
                accumulator + parseFloat(currentValue.itemPrice),
              0,
            );
            // Nếu danh sách lịch sử đơn hàng đã có mục
            if (state.OrderHistoryList.length > 0) {
              // Thêm đơn hàng mới vào đầu danh sách lịch sử đơn hàng
              state.OrderHistoryList.unshift({
                OrderDate:
                  new Date().toDateString() +
                  ' ' +
                  new Date().toLocaleTimeString(),
                CartList: state.CartList,
                CartListPrice: temp.toFixed(3).toString().replace(/\B(?=(\d{3})+(?!\d))/g,"."),
              });
            } else {
              // Nếu danh sách lịch sử đơn hàng trống, thêm đơn hàng mới vào danh sách
              state.OrderHistoryList.push({
                OrderDate:
                  new Date().toDateString() +
                  ' ' +
                  new Date().toLocaleTimeString(),
                CartList: state.CartList,
                CartListPrice: temp.toFixed(3).toString().replace(/\B(?=(\d{3})+(?!\d))/g,"."),
              });
            }
            // Sau khi thêm đơn hàng mới, đặt giỏ hàng về trạng thái trống
            state.CartList = [];
          }),
        ),
    }),
    {name: 'coffee_shop', storage: createJSONStorage(() => AsyncStorage)},
  ),
);
