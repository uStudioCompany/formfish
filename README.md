# FormFish 🐠

This project represents an idea to bring React into the world of HTML
forms.
Our approach uses such technologies like hooks and context, thus making
it easy to interact with the Form and allowing it to be built by itself.

## Installation

`formfish` is being distributed by `npm` package registry. Make sure to have
`react` and `react-dom` installed to get it properly working (of course).

```shell script
$ npm i formfish
# or
$ yarn add formfish
```

## Usage

This package has three components exposed. Each of them could be imported
from the root (named import) or from the respective component's folder (`default` import).

```typescript jsx
import { Field } from 'formfish';
// or
import Field from 'formfish/components/Field';
```

To use `formfish` properly, first, make a form!

```typescript jsx
import { Form, Field } from 'formfish';

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
            name: 'First field',
            value: '' // or any defaultValue you pass to the input
        }
    }
}
```

After you are done with this form, submit it by passing a callback to the
`onSubmit` `Form` prop. The callback signature of this function is better
explained in the **Validation** section.

Note, that `onSubmit` fires upon native form's submission, so you could
just place a button inside a form it works just right!

Also, don't bother with not wrapping your form components as we use context
to provide them with needed state. Use any level of depth - it won't break!

### Validation

If you'd like to somehow validate your form - use any method you find fit.
`Form` component has a built-in method `onValidate` that accepts a special callback
with "minified" state, that turns every field into a `name: value` pair inside of objects,
or just `value` inside of arrays. Also, it optionally passes the state from the context
as the second argument. **The same signature applies to `onSubmit`**.

Make sure to **throw an Error** when handling your validation as this will cause
`onSubmit` to not be called if something goes wrong.

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

Also, it can be represented as an array of fields or field sets
(**don't forget to pass `index` to each one of those Fields/FieldSets!**):

```typescript jsx
<FieldSet name="Array of fields">
  {['fieldOne', 'fieldTwo'].map((fieldName, index) => (
    <Field name={fieldName} index={index}>
      ...
    </Field>
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

```typescript jsx
<Field name="my-lovely-field">
  <input type="text" />
</Field>
```

Instead of passing a child component inside, it is also possible to pass a `renderInput`
prop to the `Field`, which is called with `value` and `setValue` props, that you later
use on your input.

```typescript jsx
<Field
  name="my-lovely-field"
  renderInput={({ value, setValue }) => (
    <input type="text" value={value} onBlur={({ target: { value: inputValue } }) => setValue(inputValue)} />
  )}
/>
```

**If you are using a native input, make sure to pass some default
values to the callback functions, as otherwise it will
throw a controlled/uncontrolled error.**

Also, note that `renderInput` is not affected by **Common customization
props**.

## `watch`

Every component in a `formfish` has build-in `watch` method
that grants access to its state.

It accepts a function with a state argument to grab needed state and interact
with it freely.

```typescript jsx
<Form watch={(state) => console.log(state)}> // Whole Form state
    <FieldSet watch={(state) => console.log(state)}> // This particular FieldSet only
        <Field watch={(state) => console.log(state)}> // This specific Field
            // ...
        </Form>
    </FieldSet>
</Form>
```

## `useForm`

Another method to grab a state of a certain component is to use our `useForm`
hook inside your components that dwell inside the `Form`.

It exposes the `getState` function from the context that accepts 
`lodash`-like path and returns the state of a component by this path.

## Common customization props

Every component here has some props in common. What we are interested in, though,
are those which are used for behaviour customization:

- `nameSeparator` - custom separator for the names. For example, by default
  we use `' '` to convert `field name` to `fieldName`.
- `getters` - names of props we access on the input:
  - `value`
  - `defaultValue`
  - `event`
- `getValue` - a function that helps getting a proper value from an input when needed event
  fires.
- `setValue` - a function that sets proper value on the input after it's been updated
  in the state.

On the GIF below, we `getValue` **from** the input,
convert it to `Base64`, put it in the form, then `setValue` **to** the
input converted back to `UTF-8`.

![Example](https://media.giphy.com/media/YmnFz2Vp2NtLW6QWpy/giphy.gif)

```typescript jsx
<Field getValue={value => btoa(value)} setValue={value => atob(value)}>
  <input type="text" />
</Field>
```

By default, `getValue`'s signature already uses that of a native event's
callback.

## Contributing

If you are willing to become a contributor to this project or just have
questions, fell free to come visit our [Contributing](#) guide that
will lead you further.
