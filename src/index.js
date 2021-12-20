// @flow

const assert = require("assert").strict;

// String enum

enum Status {
  Active,
  NonActive,
}
assert.equal(Status.Active, "Active");

enum StatusExplicitString {
  Active = "Active",
  NonActive = "NonActive",
}
assert.equal(StatusExplicitString.Active, "Active");
assert.equal(Status.Active, StatusExplicitString.Active);

enum StatusExplicitOfString of string {
  Active,
  NonActive,
}
assert.equal(StatusExplicitOfString.Active, "Active");
assert.equal(Status.Active, StatusExplicitOfString.Active);

// Number enum
enum Rank {
  First = 1,
  Second = 2,
  Third = 3,
}

enum RankExplicitOfNumber of number {
  First = 1,
  Second = 2,
  Third = 3,
}
assert.equal(Rank.First, RankExplicitOfNumber.First);

// Boolean enum
enum YesNo {
  Yes = true,
  No = false,
}

enum YesNoExlicitOfBoolean of boolean {
  Yes = true,
  No = false,
}
assert.equal(YesNo.Yes, YesNoExlicitOfBoolean.Yes);

// Symbol enum
enum OS of symbol {
  Mac,
  Windows,
  Linux,
}
assert.equal(OS.getName(OS.Mac), "Mac");

// With unknown members
enum GoPro {
  GoPro9,
  GoPro10,
  ...
}
const myGoPro = GoPro.GoPro9;

switch (myGoPro) {
  case GoPro.GoPro9:
    break;
  case GoPro.GoPro10:
    break;
  default:
    // このデフォルト節を省略できない
    break;
}

// 次の行はエラーになる
// const s: string = Status.Active;
// 次の行はえらーにならない
const s: string = (Status.Active: string);

const castedStatus: Status | void = Status.cast("Active");
assert.equal(castedStatus, Status.Active);
const failedStatus: Status | void = Status.cast("hoge");
assert.equal(failedStatus, undefined);

assert.equal(Status.isValid("Active"), true);
assert.equal(Status.isValid("hoge"), false);

assert.deepEqual([...Status.members()], ["Active", "NonActive"]);
assert.deepEqual([...Rank.members()], [1, 2, 3]);

assert.equal(Status.getName(Status.Active), "Active");
assert.equal(Rank.getName(Rank.First), "First");
