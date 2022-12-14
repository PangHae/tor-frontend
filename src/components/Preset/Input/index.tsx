/* eslint-disable no-underscore-dangle */
/* eslint-disable no-alert */
import { ChangeEvent, ReactElement, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Button from 'src/components/base/Button';
import InputTitle from 'src/components/base/InputTitle';
import { Title } from 'src/components/base/Title';
import CategoryModal from 'src/components/Category/Modal';
import ProductPreset from 'src/components/Product/Preset';
import useAxios from 'src/hooks/useAxios';
import { CategoryNProduct, ProductType } from 'src/types';
import CategoryList from 'src/components/Category/List';
import Input from 'src/components/base/Input';
import { useRecoilState } from 'recoil';
import { userState } from 'src/hooks/recoil/atoms/user';

import styles from './style.module.scss';

function PresetInput(): ReactElement {
  const router = useRouter();
  const [user] = useRecoilState(userState);
  const [randCategory, setRandCategory] = useState<string[]>([]);
  const [clickedCategory, setClickedCategory] = useState('');
  const [presetName, setPresetName] = useState('');
  const [productArr, setProductArr] = useState<ProductType[]>([]);
  const [presetDescription, setPresetDescription] = useState('');
  const [isCategoryModalShow, setIsCategoryModalShow] = useState(false);
  const [presetCategoryList, setPresetCatergoryList] = useState<CategoryNProduct>({
    categoryName: [],
    product: [],
  });
  const [currentIndex, setCurrentIndex] = useState(0);
  const { fetchData: getProductList, res: getProductListRes } = useAxios({
    method: 'get',
    url: '/product/_search',
    elastic: true,
  });

  const { fetchData: addPreset, res: addPresetRes } = useAxios({
    method: 'post',
    url: '/api/preset/createPreset',
  });

  const { fetchData: getPresetCategories, res: getPresetCategoriesRes } = useAxios({
    method: 'get',
    url: '/api/category/getAllPresetCategories',
  });

  useEffect(() => {
    getPresetCategories(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (getPresetCategoriesRes) {
      setRandCategory(getPresetCategoriesRes.content.map((preCat: any) => preCat.categoryName));
    }
  }, [getPresetCategoriesRes]);

  useEffect(() => {
    if (getProductListRes) {
      setProductArr(
        getProductListRes.hits.hits.map((hit: any) => {
          return {
            ...hit._source,
            imagePath: hit._source.imagepath,
            productName: hit._source.productname,
            productId: hit._source.productid,
          };
        }),
      );
    }
  }, [getProductListRes]);

  useEffect(() => {
    if (addPresetRes) {
      router.push('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addPresetRes]);

  const handleCategoryModalClose = () => {
    setIsCategoryModalShow(false);
  };
  const handleCategoryModalOpen = () => {
    setIsCategoryModalShow(true);
  };

  const handleClickCategory = (categoryName: string, index: number) => {
    // ???????????? ???????????? ?????? ????????? ???????????? ?????????.
    setCurrentIndex(index);
    getProductList(`?q=categoryname:${encodeURI(categoryName)}`);
  };

  const handleChangePresetName = (e: ChangeEvent) => {
    const { target } = e;
    setPresetName((target as HTMLInputElement).value);
  };

  const handleChangePresetDescript = (e: ChangeEvent) => {
    const { target } = e;
    setPresetDescription((target as HTMLInputElement).value);
  };

  const handleOnclickProduct = (product: ProductType) => {
    const tmpProductList = [...presetCategoryList.product];
    tmpProductList[currentIndex] = product;
    setPresetCatergoryList({
      categoryName: [...presetCategoryList.categoryName],
      product: tmpProductList,
    });
  };

  const handleClickSave = () => {
    if (!presetName) {
      alert('????????? ????????? ??????????????????.');
      return;
    }
    if (!presetDescription) {
      alert('????????? ????????? ??????????????????.');
      return;
    }
    if (presetCategoryList.categoryName.length !== presetCategoryList.product.length) {
      alert('????????? ??????????????? ????????? ?????? ??????????????????.');
      return;
    }
    if (!clickedCategory) {
      alert('??????????????? ??????????????????.');
      return;
    }
    if (presetCategoryList.categoryName.length < 1) {
      alert('??????????????? 1??? ?????? ??????????????????.');
      return;
    }
    const requestData = {
      presetName,
      presetContent: presetDescription,
      presetCategoryName: clickedCategory.includes('#')
        ? clickedCategory.substring(1)
        : clickedCategory,
      producer: user.userName,
      items: {},
    };
    // eslint-disable-next-line array-callback-return
    presetCategoryList.product.map((item, index) => {
      requestData.items = {
        ...requestData.items,
        [item.productId]: presetCategoryList.categoryName[index],
      };
    });
    addPreset(requestData);
  };

  return (
    <div className={styles.PresetCreate}>
      <div className={styles.PresetInfoSet}>
        <Title classname='BigTitle' text='????????? ?????????' />
        <hr style={{ margin: '0', marginBottom: '10px' }} />
        <InputTitle
          inputClassname='LongInput'
          titleClassname='PresetCreateTitle'
          title='????????? ??????'
          placeholder='????????? ????????? ??????????????????'
          value={presetName}
          onChange={handleChangePresetName}
        />
        <InputTitle
          inputClassname='LongInput'
          titleClassname='PresetCreateTitle'
          title='??????'
          placeholder='?????? ???????????? ??????????????????. ????????? 300?????? ???????????????.'
          inputMaxLen={300}
          value={presetDescription}
          onChange={handleChangePresetDescript}
        />
        <div className={styles.SetCategory}>
          <Title text='????????? ????????????' classname='CategoryTitle' />
          <Input classname='ShortInput' disabled value={clickedCategory} onChange={() => {}} />
          <CategoryList categoryList={randCategory} setCategory={setClickedCategory} />
        </div>
      </div>
      <div className={styles.SelectField}>
        <Title classname='BigTitle' text='???????????? ??? ?????? ??????' />
        <hr style={{ margin: '0', marginBottom: '10px' }} />
        <div className={styles.Select}>
          <div className={styles.SelectCategory}>
            <div className={styles.SelectCategoryTitle} onClick={handleCategoryModalOpen}>
              {'???????????? ?????? >'}
            </div>
            {presetCategoryList?.categoryName.map((categoryName, index) => {
              return (
                <div
                  className={styles.CategoryBox}
                  onClick={() => handleClickCategory(categoryName, index)}
                >
                  {presetCategoryList.product[index] ? (
                    <span>{`${categoryName} > ${presetCategoryList.product[index].productName}`}</span>
                  ) : (
                    <span>{categoryName}</span>
                  )}
                </div>
              );
            })}
          </div>
          <hr />
          <div className={styles.SelectItem}>
            {productArr.length === 0 ? (
              presetCategoryList?.categoryName.length === 0 ? (
                '????????? ??????????????? ????????????'
              ) : (
                '????????? ???????????? ????????????'
              )
            ) : (
              <>
                <Title text='?????? ??????' />
                {productArr.map((product) => (
                  <ProductPreset product={product} onClick={() => handleOnclickProduct(product)} />
                ))}
              </>
            )}
          </div>
        </div>
        <div className={styles.ButtonWrapper}>
          <Button onClick={handleClickSave}>??????</Button>
        </div>
      </div>
      {isCategoryModalShow && (
        <CategoryModal
          onClose={handleCategoryModalClose}
          presetCategoryList={presetCategoryList}
          setPresetCategoryList={setPresetCatergoryList}
        />
      )}
    </div>
  );
}

export default PresetInput;
