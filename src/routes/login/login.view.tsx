import { defineComponent, ref, withModifiers } from 'vue';

import { RootRoute } from '~/routes/root.route';
import {
  ValidationRules,
  InputText,
  Input,
  FieldInput,
  Rule,
} from '~/shared/ui/form';
import { userStore } from '~/entities/user/user.state';
import { ButtonType, Button } from '~/shared/ui/button';
import { useTask } from '~/shared/lib/task';
import { useForm } from '~/shared/ui/form/lib/form';

const LoginView = defineComponent({
  name: 'Login',
  setup() {
    const form = useForm({
      login: FieldInput.new<string>({
        value: ref(''),
        validation: new ValidationRules([Rule.IsRequired, Rule.IsEmail]),
      }),
      password: FieldInput.new<string>({
        value: ref(''),
        validation: new ValidationRules([Rule.IsRequired, Rule.MinLen(8)]),
      }),
    });

    const loginTask = useTask(async () =>
      userStore.login({
        email: form.login.value,
        password: form.password.value,
      }),
    );
    return {
      form,
      loginTask,
    };
  },
  methods: {
    async onSubmit() {
      if (!this.form.validate()) {
        return;
      }
      const [result] = await this.loginTask.run();
      if (result) {
        this.$router.push({
          name: RootRoute.name,
        });
      }
    },
  },
  render() {
    return (
      <form
        class="bg-white rounded max-w-sm space-y-4 shadow-lg w-full p-6"
        onSubmit={withModifiers(this.onSubmit, ['prevent'])}
      >
        <h1 class="font-bold text-xl text-gray-500">Sign in</h1>

        <Input
          field={this.form.login}
          slots={{
            label: 'E-mail',
            input: ({ value, set }) => (
              <InputText
                value={value}
                on={{ input: set }}
                autocomplete="username"
              />
            ),
          }}
        />
        <Input
          field={this.form.password}
          slots={{
            label: 'Password',
            input: ({ value, set }) => (
              <InputText
                value={value}
                on={{ input: set }}
                autocomplete="username"
                type="password"
              />
            ),
          }}
        />

        <div class="flex gap-4">
          <Button
            buttonType={ButtonType.action}
            loading={this.loginTask.pending}
          >
            Login
          </Button>
          <div>
            <a href="#" class="text-sm text-gray-600 block hocus:underline">
              Forgot password?
            </a>
            <a href="#" class="text-sm text-gray-600 block hocus:underline">
              Register
            </a>
          </div>
        </div>
        {this.loginTask.errors.map((err) => {
          return (
            <span class="text-xs text-red-500 block first:mt-4">{err}</span>
          );
        })}
      </form>
    );
  },
});

export default LoginView;
