# Form Engine

This project represents an idea to bring React into the world of HTML
forms.
Our approach uses such technologies like hooks and context, thus making
it easy to interact with the Form and allowing it to be built by itself.

## Installation

`form-engine` is being distributed by `npm` package registry. Make sure to have
`react`, `react-dom` and `styled-components` installed to get it properly working.

```shell script
$ npm i form-engine
# or
$ yarn add form-engine
```

## Usage

This package has three components exposed. Each of them could be imported
from the root (named import) or from the respective component's folder (`default` import).

```typescript jsx
import { Field } from 'form-engine';
// or
import Field from 'form-engine/components/Field';
```

To use `form-engine` properly, first, make a form!

```typescript jsx
import { Form, Field } from 'form-engine';

const App = () => (
  <Form name="My lovely form" onSubmit={handleSubmit}>
    <Field name="First field">
      <input type="text" />
    </Field>
  </Form>
);
```

With such a setup our form state should automatically build itself
in an object with the following scheme:

```typescript
{
    myLovelyForm: {
        firstField: {
            name: 'firstField',
            path: 'myLovelyForm.firstField'
            value: '' // or any defaultValue you pass to the input
        }
    }
}
```

After you are done with this form, submit it by passing a callback to the
`onSubmit` `Form` prop.

## Validation

If you'd like to somehow validate your form - you any method you find fit.
`Form` component has built-in method `onValidate` that accepts a special callback.

If your validation is successful inside this callback, you pass!
If your validation breaks, you should absolutely `throw` an `Error` object,
containing the scheme we saw earlier on (the one our `Form` builds itself with)
but with `error` field in each place you want the error to pop up.

After that, the state of errors gets merged with the form state and you
can access and handle them freely.

## Contributing

If you are willing to become a contributor to this project or just have
questions, fell free to come visit our [Contributing](#) guide - this
will lead you further.
