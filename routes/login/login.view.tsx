import { defineComponent, ref, withModifiers } from 'vue';

import { RootRoute } from '../root.route';

import { useForm } from '~/app/common/form/form';
import { InputField } from '~/app/common/form/input-field';
import { ValidationRules } from '~/app/common/form/validator';
import { IsEmail } from '~/app/common/form/validators/is-email.validator';
import { IsRequired } from '~/app/common/form/validators/is-required.validator';
import { MinLen } from '~/app/common/form/validators/length/min-length.validator';
import { userStore } from '~/app/user/user.state';
import { ButtonType } from '~/ui/button/button';
import { Button } from '~/ui/button/button.ui';
import { InputText } from '~/ui/form/text.input';
import { useTask } from '~/app/common/task';

export default defineComponent({
  name: 'Login',
  setup() {
    const form = useForm({
      login: InputField.new<string>({
        value: ref(''),
        validation: new ValidationRules([IsRequired, IsEmail]),
      }),
      password: InputField.new<string>({
        value: ref(''),
        validation: new ValidationRules([IsRequired, MinLen(8)]),
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
        class="bg-white p-6 rounded shadow-lg w-full max-w-sm space-y-4"
        onSubmit={withModifiers(this.onSubmit, ['prevent'])}
      >
        <h1 class="text-gray-500 font-bold text-xl">Sign in</h1>
        <InputText
          field={this.form.login}
          label="E-mail"
          {...{
            autocomplete: 'username',
          }}
        />
        <InputText
          field={this.form.password}
          label="Password"
          {...{ type: 'password', autocomplete: 'current-password' }}
        />

        <div class="space-y-2">
          <a
            href="#"
            class="block text-sm text-gray-600 focus:underline hover:underline"
          >
            Forgot password
          </a>
          <a
            href="#"
            class="block text-sm text-gray-600 focus:underline  hover:underline"
          >
            Register
          </a>
        </div>

        <Button type={ButtonType.action} loading={this.loginTask.pending}>
          Login
        </Button>

        {this.loginTask.errors.map((err) => {
          return (
            <span class="block text-red-500 text-xs first:mt-4">{err}</span>
          );
        })}
      </form>
    );
  },
});
