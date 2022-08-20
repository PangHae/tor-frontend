import { ReactElement, useState } from 'react';
import Button from 'src/components/base/Button';
import Column from 'src/components/base/Column';
import Row from 'src/components/base/Row';
import CartBottomModal from 'src/components/CartBottomModal';
import PresetCartCard from 'src/components/Preset/CartCard';
import ShowItems from 'src/components/ShowItems';

import { PresetType } from 'src/types';

import styles from './style.module.scss';

const tempPresetList: PresetType[] = [
  {
    presetId: 0,
    presetName: '야 너두 집밥 뚝딱',
    presetContent:
      '집밥 냠냠냠냔ㅁ 집밥 냠냠냠냔ㅁ 집밥 냠냠냠냔ㅁ 집밥 냠냠냠냔ㅁ 집밥 냠냠냠냔ㅁ 집밥 냠냠냠냔ㅁ 집밥 냠냠냠냔ㅁ',
    categoryName: 'category1',
    recommend: 24,
    producer: '응호애현',
    products: [
      {
        productId: 1,
        productName: '갈비탕',
        category: 'korean',
        company: '사미헌',
        price: 12000,
        weight: '400g',
        score: 4.5,
        imagePath: 'hihi',
        checked: true,
        count: 1,
      },
      {
        productId: 2,
        productName: '깍둑이',
        category: 'korean',
        company: '사미헌',
        price: 7500,
        weight: '200g',
        score: 2.0,
        imagePath: 'hihi',
        checked: true,
        count: 1,
      },
    ],
  },
  {
    presetId: 1,
    presetName:
      '가성비충 꼭 봐주면 돼.. 가성비충 꼭 봐주면 돼.. 가성비충 꼭 봐주면 돼.. 가성비충 꼭 봐주면 돼..',
    presetContent:
      '가성비 냠냠냠냔ㅁ 집밥 냠냠냠냔ㅁ 집밥 냠냠냠냔ㅁ 집밥 냠냠냠냔ㅁ 집밥 냠냠냠냔ㅁ 집밥 냠냠냠냔ㅁ 집밥 냠냠냠냔ㅁ',
    categoryName: 'category1',
    recommend: 1024,
    producer: '응준애호',
    products: [
      {
        productId: 1,
        productName: '갈비탕',
        category: 'korean',
        company: '사미헌',
        price: 12000,
        weight: '400g',
        score: 4.5,
        imagePath: 'hihi',
        checked: true,
        count: 1,
      },
      {
        productId: 2,
        productName: '깍둑이',
        category: 'korean',
        company: '사미헌',
        price: 7500,
        weight: '200g',
        score: 2.0,
        imagePath: 'hihi',
        checked: true,
        count: 1,
      },
    ],
  },
  {
    presetId: 2,
    presetName: '오분 완성 연애 요리',
    presetContent:
      '오븐 완성 냠냠냠냔ㅁ 집밥 냠냠냠냔ㅁ 집밥 냠냠냠냔ㅁ 집밥 냠냠냠냔ㅁ 집밥 냠냠냠냔ㅁ 집밥 냠냠냠냔ㅁ 집밥 냠냠냠냔ㅁ',
    categoryName: 'category1',
    recommend: 10000,
    producer: '응범애석',
    products: [
      {
        productId: 1,
        productName: '갈비탕',
        category: 'korean',
        company: '사미헌',
        price: 12000,
        weight: '400g',
        score: 4.5,
        imagePath: 'hihi',
        checked: true,
        count: 1,
      },
      {
        productId: 2,
        productName: '깍둑이',
        category: 'korean',
        company: '사미헌',
        price: 7500,
        weight: '200g',
        score: 2.0,
        imagePath: 'hihi',
        checked: true,
        count: 1,
      },
    ],
  },
  {
    presetId: 3,
    presetName: '근데 파르페가 뭐임',
    presetContent:
      '파르페 냠냠냠냔ㅁ 집밥 냠냠냠냔ㅁ 집밥 냠냠냠냔ㅁ 집밥 냠냠냠냔ㅁ 집밥 냠냠냠냔ㅁ 집밥 냠냠냠냔ㅁ 집밥 냠냠냠냔ㅁ',
    categoryName: 'category1',
    recommend: 10,
    producer: '이광해 바보',
    products: [
      {
        productId: 1,
        productName: '갈비탕',
        category: 'korean',
        company: '사미헌',
        price: 12000,
        weight: '400g',
        score: 4.5,
        imagePath: 'hihi',
        checked: true,
        count: 1,
      },
      {
        productId: 2,
        productName: '깍둑이',
        category: 'korean',
        company: '사미헌',
        price: 7500,
        weight: '200g',
        score: 2.0,
        imagePath: 'hihi',
        checked: true,
        count: 1,
      },
      {
        productId: 3,
        productName: 'gasdgasgdas',
        category: 'korean',
        company: '사미헌',
        price: 13000,
        weight: '200g',
        score: 1.0,
        imagePath: 'hihi',
        checked: true,
        count: 1,
      },
    ],
  },
];

function CartList(): ReactElement {
  const initPrice = tempPresetList.reduce((priceSum, preset) => {
    const presetTotalPrice = preset.products!.reduce((prev, product) => prev + product.price, 0);
    return priceSum + presetTotalPrice;
  }, 0);

  const [totalPrice, setTotalPrice] = useState(initPrice);
  const [presetList, setPresetList] = useState<PresetType[]>(tempPresetList);

  const handlePresetAdd = (presetId: number) => {
    let addPrice = 0;
    setPresetList(
      [...presetList].map((preset) => {
        return {
          ...preset,
          products: preset.products!.map((product) => {
            if (presetId === preset.presetId) {
              product.checked = true;
              addPrice += product.price;
            }
            return product;
          }),
        };
      }),
    );
    setTotalPrice(totalPrice + addPrice);
  };

  const handlePresetRemove = (presetId: number) => {
    let removePrice = 0;
    setPresetList(
      [...presetList].map((preset) => {
        return {
          ...preset,
          products: preset.products!.map((product) => {
            if (presetId === preset.presetId) {
              product.checked = false;
              removePrice += product.price;
            }
            return product;
          }),
        };
      }),
    );
    setTotalPrice(totalPrice - removePrice);
  };

  const handleTotalPriceAdd = (price: number) => {
    setTotalPrice(totalPrice + price);
  };

  const handleTotalPriceSub = (price: number) => {
    setTotalPrice(totalPrice - price);
  };

  return (
    <Column className={styles.Wrapper}>
      <p className={styles.Title}>장바구니</p>
      {tempPresetList.map((preset) => (
        <PresetCartCard
          key={preset.presetId}
          originalPreset={preset}
          funcBind={[handlePresetAdd, handlePresetRemove, handleTotalPriceAdd, handleTotalPriceSub]}
        />
      ))}
      <ShowItems tabTitle='이 모음집 구매자들이 구매한 모음집 >' />
      <ShowItems tabTitle='이 모음집과 비슷한 모음집 >' />
      <div className={styles.Horizontal} />
      <Row className={styles.PriceWrapper}>
        <Row>
          <p>총 금액</p>
          <p className={styles.Price}>{totalPrice.toLocaleString()}</p>
          <p>원</p>
        </Row>
        <Button>구매</Button>
      </Row>
      <CartBottomModal totalPrice={totalPrice} />
    </Column>
  );
}

export default CartList;
