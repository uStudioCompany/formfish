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

Note, that `onSubmit` fires upon native form's submission, so you could
just place a button inside a form it works just right!

Also, don't bother with not wrapping your form components as we use context
to provide them with needed state. Use any level of depth - it won't break!

### Validation

If you'd like to somehow validate your form - yse any method you find fit.
`Form` component has a built-in method `onValidate` that accepts a special callback.

If your validation is successful inside this callback, you pass!
If it breaks, you should absolutely `throw` an `Error` object,
containing the scheme we saw earlier on (the one our `Form` builds itself with)
but with `error` field in each place the error popped up.

After that, the state of errors gets merged with the form state and you
can access and handle them freely.

### `FieldSet`

`FieldSet` is a wrapper around multiple fields at a time. It can be used
as an object-like structure:

```typescript jsx
<FieldSet name="Object of fields">
    <Field name="Field one">...</Field>

    <Field name="Field two">...</Field>
</FieldSet>
```

This will produce a state with the following interface:

```typescript
{
    objectOfFields: {
        fieldOne: { ... },
        fieldTwo: { ... }
    }
}
```

Also it can be represented as an array of fields (**don't forget to pass 
`index` to each one of them!**): 

```typescript jsx
<FieldSet name="Array of fields">
    {['fieldOne', 'fieldTwo'].map((fieldName, index) => (
        <Field name={fieldName} index={index}>...</Field>
    ))}
</FieldSet>
```

This will result in an array within your state:

```typescript
{
    arrayOfFields: [{...}, {...}]
}
```

### `Field`

`Field` is a wrapper around your input.
It automatically registers an input in the form, providing it
with context about its value.

By default, it gets `value`, `onChange` and `defaultValue` props of an
input. This behaviour could be modified through `getters` prop, which
accepts overrides for names of each of these values. 

## `watch`

Every component in a `form-engine` has build-in `watch` method
that grants access to its state.

It accepts a function with a proper argument (TypeScript supported)
to grab needed state and interact with it freely.

## Contributing

If you are willing to become a contributor to this project or just have
questions, fell free to come visit our [Contributing](#) guide that
will lead you further.