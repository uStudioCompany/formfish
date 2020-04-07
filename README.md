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
`onSubmit` `Form` prop.

Note, that `onSubmit` fires upon native form's submission, so you could
just place a button inside a form it works just right!

Also, don't bother with not wrapping your form components as we use context
to provide them with needed state. Use any level of depth - it won't break!

### Validation

If you'd like to somehow validate your form - use any method you find fit.
`Form` component has a built-in method `onValidate` that accepts a special callback.

If your validation is successful inside this callback, you pass!
If it breaks, you should absolutely `throw` an `Error` object,
following the scheme we saw earlier on (the one our `Form` builds itself with)
but with `error` field in each place the error popped up.

For example, if we see our `First field` breaking the validation, the `onValidate`
handler should throw an error with the following object inside:

```typescript
{
    myLovelyForm: {
        firstField: {
            error: 'Oopsie!'
        }
    }
}
```

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
`index` to each one of those Fields!**):

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
<Field
    getValue={({ target: { value = '' } }) => btoa(value)}
    setValue={(value) => atob(value)}
>
    <input type="text" />
</Field>
```

## Contributing

If you are willing to become a contributor to this project or just have
questions, fell free to come visit our [Contributing](#) guide that
will lead you further.
