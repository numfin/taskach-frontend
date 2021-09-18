import { defineComponent, ref } from 'vue';

import { Input, InputSelect, FieldSelect } from '~/shared/ui/form';
import { Logo } from '~/shared/ui/logo';

export const Header = defineComponent({
  name: 'Header',
  setup() {
    type ItemType = { title: string; value: number };

    const project = FieldSelect.new<number | undefined, ItemType>({
      value: ref(),
      items: ref([]),
    });
    const sprint = FieldSelect.new<number | undefined, ItemType>({
      value: ref(),
      items: ref([]),
    });

    const isLoading = ref(true);
    setTimeout(() => {
      project.variants.push(
        { title: 'Project 1', value: 0 },
        { title: 'Project 2', value: 1 },
      );
      project.set(1);
      sprint.variants.push(
        { title: 'Sprint 1', value: 0 },
        { title: 'Sprint 2', value: 1 },
      );
      sprint.set(1);
      isLoading.value = false;
    }, 1000);

    return () => (
      <div class="bg-gray-200">
        <div class="flex mx-auto max-w-6xl p-4 gap-4">
          <Logo />
          <div class="w-full max-w-48">
            <Input
              field={project}
              slots={{
                label: 'Project',
                input: ({ value, set }) => (
                  <InputSelect
                    value={value}
                    on={{
                      select: (v) => set(v.value),
                    }}
                    variants={project.variants}
                    display={(v) => v?.title ?? 'Pick project'}
                    map={(v) => v.value}
                    pending={isLoading.value}
                  />
                ),
              }}
            />
          </div>
          <div class="w-full max-w-48">
            <Input
              field={sprint}
              slots={{
                label: 'Sprint',
                input: ({ value, set }) => (
                  <InputSelect
                    value={value}
                    on={{
                      select: (v) => set(v.value),
                    }}
                    variants={sprint.variants}
                    display={(v) => v?.title ?? 'Pick sprint'}
                    map={(v) => v.value}
                    pending={isLoading.value}
                  />
                ),
              }}
            />
          </div>
        </div>
      </div>
    );
  },
});
