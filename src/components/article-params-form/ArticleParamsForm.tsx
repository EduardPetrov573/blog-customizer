import { clsx } from 'clsx';
import { useRef, useState } from 'react';
import {
  backgroundColors,
  contentWidthArr,
  defaultArticleState,
  fontColors,
  fontFamilyOptions,
  fontSizeOptions,
} from 'src/constants/articleProps';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';

import type { Dispatch, FormEvent, SetStateAction } from 'react';
import type { ArticleStateType, OptionType } from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
  /** Текущее применённое к статье состояние */
  articleState: ArticleStateType;
  /** Сеттер применённого состояния статьи */
  setArticleState: Dispatch<SetStateAction<ArticleStateType>>;
};

export const ArticleParamsForm = ({
  articleState,
  setArticleState,
}: ArticleParamsFormProps): React.JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  // Черновик формы: изменения тут не влияют на статью, пока не нажата «Применить»
  const [formState, setFormState] = useState<ArticleStateType>(articleState);

  const rootRef = useRef<HTMLDivElement>(null);

  useOutsideClickClose({
    isOpen,
    rootRef,
    onClose: () => setIsOpen(false),
    onChange: setIsOpen,
  });

  const handleArrowClick = (): void => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const handleFontFamilyChange = (fontFamilyOption: OptionType): void => {
    setFormState((prevState) => ({ ...prevState, fontFamilyOption }));
  };

  const handleFontSizeChange = (fontSizeOption: OptionType): void => {
    setFormState((prevState) => ({ ...prevState, fontSizeOption }));
  };

  const handleFontColorChange = (fontColor: OptionType): void => {
    setFormState((prevState) => ({ ...prevState, fontColor }));
  };

  const handleBackgroundColorChange = (backgroundColor: OptionType): void => {
    setFormState((prevState) => ({ ...prevState, backgroundColor }));
  };

  const handleContentWidthChange = (contentWidth: OptionType): void => {
    setFormState((prevState) => ({ ...prevState, contentWidth }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    setArticleState(formState);
  };

  const handleReset = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    setFormState(defaultArticleState);
    setArticleState(defaultArticleState);
  };

  return (
    <div ref={rootRef}>
      <ArrowButton isOpen={isOpen} onClick={handleArrowClick} />
      <aside className={clsx(styles.container, { [styles.container_open]: isOpen })}>
        <form className={styles.form} onSubmit={handleSubmit} onReset={handleReset}>
          <Text as="h2" size={31} weight={800} uppercase>
            Задайте параметры
          </Text>
          <Select
            title="шрифт"
            selected={formState.fontFamilyOption}
            options={fontFamilyOptions}
            onChange={handleFontFamilyChange}
          />
          <RadioGroup
            title="размер шрифта"
            name="fontSize"
            selected={formState.fontSizeOption}
            options={fontSizeOptions}
            onChange={handleFontSizeChange}
          />
          <Select
            title="цвет шрифта"
            selected={formState.fontColor}
            options={fontColors}
            onChange={handleFontColorChange}
          />
          <Separator />
          <Select
            title="цвет фона"
            selected={formState.backgroundColor}
            options={backgroundColors}
            onChange={handleBackgroundColorChange}
          />
          <Select
            title="ширина контента"
            selected={formState.contentWidth}
            options={contentWidthArr}
            onChange={handleContentWidthChange}
          />
          <div className={styles.bottomContainer}>
            <Button title="Сбросить" htmlType="reset" type="clear" />
            <Button title="Применить" htmlType="submit" type="apply" />
          </div>
        </form>
      </aside>
    </div>
  );
};
