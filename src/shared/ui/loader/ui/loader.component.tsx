import { defineComponent, PropType } from 'vue';

import loaderStyle from './loader.module.css';
import { LoaderSize } from './loader.config';

import { iterate } from '~/shared/lib/iterate';

const SQUARES = 4;
const DURATION = 1500;
const DELAY = DURATION / SQUARES;

export const Loader = defineComponent({
  name: 'Loader',
  props: {
    size: {
      type: Number as PropType<LoaderSize>,
      default: LoaderSize.Normal,
    },
    dark: Boolean,
  },
  render() {
    return (
      <div
        class={[
          'relative',
          {
            'w-14 h-14': this.size === LoaderSize.Big,
            'w-9 h-9': this.size === LoaderSize.Normal,
            'w-5 h-5': this.size === LoaderSize.Small,
          },
        ]}
      >
        {Array.from(iterate(SQUARES)).map((_, i) => {
          return (
            <div
              class={[
                'w-1/2 h-1/2 absolute top-0 left-0 transform-gpu',
                loaderStyle.moveWrapper,
              ]}
              style={{
                animationDelay: `${DELAY * i}ms`,
                animationDuration: `${DURATION}ms`,
              }}
            >
              <div
                class={[
                  'rounded-full absolute top-0 left-0 transform-gpu',

                  {
                    'w-5 h-5': this.size === LoaderSize.Big,
                    'w-3 h-3': this.size === LoaderSize.Normal,
                    'w-2 h-2': this.size === LoaderSize.Small,
                    'bg-white': !this.dark,
                    'bg-blue-500': this.dark,
                  },
                ]}
              />
            </div>
          );
        })}
      </div>
    );
  },
});
