# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.6.4](https://github.com/uStudioCompany/formfish/compare/v0.6.3...v0.6.4) (2020-04-27)


### Bug Fixes

* add export type statements ([d662727](https://github.com/uStudioCompany/formfish/commit/d662727a40ad3abd0c09f649d8112964b5e65616))
* Restore lost code ([5f94ea2](https://github.com/uStudioCompany/formfish/commit/5f94ea22508eb5eaa61a0fafbba236007cace8d6))
* Update Field ([8e2d2ad](https://github.com/uStudioCompany/formfish/commit/8e2d2ad430a85c3016fda9c793f13ac4acc92a9f))

### [0.6.3](https://github.com/uStudioCompany/formfish/compare/v0.6.2...v0.6.3) (2020-04-27)


### Features

* **FieldSet:** remove extra markup ([2fe29e0](https://github.com/uStudioCompany/formfish/commit/2fe29e043fba9a0e8eb209886a4c8b1566d8bb4c))


### Bug Fixes

* Fix type exports ([59c7b63](https://github.com/uStudioCompany/formfish/commit/59c7b63151b198a5483e741c5f0c796c6b5e0374))
* Refactor file structure, fix FieldSet watch method, refactor types ([74c310c](https://github.com/uStudioCompany/formfish/commit/74c310c48c218470439c4233ddff845b5bb46d7b))

### [0.6.2](https://github.com/uStudioCompany/formfish/compare/v0.6.1...v0.6.2) (2020-04-16)


### Bug Fixes

* **Field:** set default input value through setValue function ([3247e3f](https://github.com/uStudioCompany/formfish/commit/3247e3f2f3a6ec36ac8fd3baf4529b89a5b8c3ea))

### [0.6.1](https://github.com/uStudioCompany/formfish/compare/v0.6.0...v0.6.1) (2020-04-16)


### Bug Fixes

* Fix renderInput function, add more render optimizations ([cdab75a](https://github.com/uStudioCompany/formfish/commit/cdab75ae55ae4bf11d4844d77b1074a56b610bc3))

## [0.6.0](https://github.com/uStudioCompany/formfish/compare/v0.5.1...v0.6.0) (2020-04-15)


### Features

* Pass `id` to the input ([abb4782](https://github.com/uStudioCompany/formfish/commit/abb478282a1c0a98a3218e0112617e243fd79a98))
* Remove React.memo exports ([d5dc15f](https://github.com/uStudioCompany/formfish/commit/d5dc15ff197369fff57cd4ec016ea19e9bc18251))


### Bug Fixes

* **Field:** give proper value back to the input ([f3a7fdc](https://github.com/uStudioCompany/formfish/commit/f3a7fdc8943a9137d67845af4f61a53450fe4aa5))

### [0.5.1](https://github.com/uStudioCompany/formfish/compare/v0.5.0...v0.5.1) (2020-04-15)


### Bug Fixes

* **getValue:** return clean value from the input ([7b37ab0](https://github.com/uStudioCompany/formfish/commit/7b37ab0417d8fa1e9ef57daaab417fc43e7ff47e))

## [0.5.0](https://github.com/uStudioCompany/formfish/compare/v0.4.1...v0.5.0) (2020-04-09)


### Features

* Expose useForm hook ([1f2c189](https://github.com/uStudioCompany/formfish/commit/1f2c18905a77a0a1a15dc629327bbcc11902f723))

### [0.4.1](https://github.com/uStudioCompany/formfish/compare/v0.4.0...v0.4.1) (2020-04-08)


### Bug Fixes

* Move React.memo into default export ([caa42df](https://github.com/uStudioCompany/formfish/commit/caa42df92b311935b8db66eea29fc82db2d679d5))

## [0.4.0](https://github.com/uStudioCompany/formfish/compare/v0.3.2...v0.4.0) (2020-04-08)


### Features

* Add clean state function, refactor validation logic ([5471bfe](https://github.com/uStudioCompany/formfish/commit/5471bfef5e9f1903a443698a3a308ee6c29ad8e2))
* Add displayName ([bcbdae6](https://github.com/uStudioCompany/formfish/commit/bcbdae636be00cd3ae2090b619aca942fafd404c))
* Add renderInput method to Field ([50cf6d1](https://github.com/uStudioCompany/formfish/commit/50cf6d1459bf618337713cf2a57d2bd201e86e6b))


### Bug Fixes

* Change unregister action flow ([989a139](https://github.com/uStudioCompany/formfish/commit/989a139c7463fbe0a2500add9a40f67580ec17ae))

### [0.3.2](https://github.com/uStudioCompany/formfish/compare/v0.3.1...v0.3.2) (2020-04-07)


### Bug Fixes

* Cleanup empty form members on submit ([8d637b7](https://github.com/uStudioCompany/formfish/commit/8d637b7dbb8d02db4041b8206dbd599615a04a94))

### [0.3.1](https://github.com/uStudioCompany/formfish/compare/v0.3.0...v0.3.1) (2020-04-07)


### Bug Fixes

* Change unregister action logic ([831a1cb](https://github.com/uStudioCompany/formfish/commit/831a1cbe7bb8278c1c2873572dabdc305e8c8eb3))
* Fix create-field-name function for single-word names ([c7f5da8](https://github.com/uStudioCompany/formfish/commit/c7f5da8b134bbc90da1456142782c7647efc3160))

## [0.3.0](https://github.com/uStudioCompany/formfish/compare/v0.2.2...v0.3.0) (2020-04-07)


### Features

* make onSubmit return flattened state and whole context ([ff7ea4f](https://github.com/uStudioCompany/formfish/commit/ff7ea4f59bad6d830cd730afb857a40cf77166ee))

### [0.2.2](https://github.com/uStudioCompany/formfish/compare/v0.2.1...v0.2.2) (2020-04-07)


### Bug Fixes

* **Field:** remove subscribe from Field dependencies ([9c9b5f4](https://github.com/uStudioCompany/formfish/commit/9c9b5f4c6f553f31ec68e338f49cbe2a36ce36df))

### [0.2.1](https://github.com/uStudioCompany/formfish/compare/v0.2.0...v0.2.1) (2020-04-07)


### Bug Fixes

* **Field:** check if subscribe method exists in current context ([8de4c52](https://github.com/uStudioCompany/formfish/commit/8de4c520b1df2e8a2b0e7c3d0df867498eaf9248))

## 0.2.0 (2020-04-07)
