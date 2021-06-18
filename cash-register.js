function checkCashRegister (price, cash, cid) {
  var change;
  let ret = cash - price;
  const total = cid.reduce((p, c) => accAdd(p, c[1]), 0);

  if (ret == total) {
    change = { status: "CLOSED", change: cid }
  } else if (ret > total) {
    change = { status: "INSUFFICIENT_FUNDS", change: [] }
  } else {
    const M1 = {
      PENNY: 0.01,
      NICKEL: 0.05,
      DIME: 0.1,
      QUARTER: 0.25,
      ONE: 1,
      FIVE: 5,
      TEN: 10,
      TWENTY: 20,
      "ONE HUNDRED": 100,
    }

    const M2 = cid.reduce((p, c) => { p[c[0]] = c[1]; return p; }, {})
    const retChange = [];

    ["ONE HUNDRED", "TWENTY", "TEN", "FIVE", "ONE", "QUARTER", "DIME", "NICKEL", "PENNY"].forEach(unit => {
      let ret1;

      if (!+ret) return;
      if (M2[unit] && (ret1 = Math.floor(accDiv(ret, M1[unit])))) {
        const ret2 = accMul(ret1, M1[unit])

        if (M2[unit] >= ret2) {
          retChange.push([unit, ret2])
          ret = accSub(ret, ret2)
        } else {
          retChange.push([unit, M2[unit]])
          ret = accSub(ret, M2[unit])
        }
      }
    })

    if (+ret) {
      change = { status: "INSUFFICIENT_FUNDS", change: [] }
    } else {
      change = { status: "OPEN", change: retChange }
    }
  }
  return change;
}

function accAdd (arg1, arg2) {
  var r1, r2, m, c;

  try {
    r1 = arg1.toString().split(".")[1].length;
  }

  catch (e) {
    r1 = 0;
  }

  try {
    r2 = arg2.toString().split(".")[1].length;
  }

  catch (e) {
    r2 = 0;
  }

  c = Math.abs(r1 - r2);
  m = Math.pow(10, Math.max(r1, r2));

  if (c > 0) {
    var cm = Math.pow(10, c);

    if (r1 > r2) {
      arg1 = Number(arg1.toString().replace(".", ""));
      arg2 = Number(arg2.toString().replace(".", "")) * cm;
    } else {
      arg1 = Number(arg1.toString().replace(".", "")) * cm;
      arg2 = Number(arg2.toString().replace(".", ""));
    }
  } else {
    arg1 = Number(arg1.toString().replace(".", ""));
    arg2 = Number(arg2.toString().replace(".", ""));
  }

  return (arg1 + arg2) / m;
}

function accSub (arg1, arg2) {
  var r1, r2, m, n;

  try {
    r1 = arg1.toString().split(".")[1].length;
  }

  catch (e) {
    r1 = 0;
  }

  try {
    r2 = arg2.toString().split(".")[1].length;
  }

  catch (e) {
    r2 = 0;
  }

  m = Math.pow(10, Math.max(r1, r2));
  n = (r1 >= r2) ? r1 : r2;

  return ((arg1 * m - arg2 * m) / m).toFixed(n);
}

function accMul (arg1, arg2) {
  var m = 0, s1 = arg1.toString(), s2 = arg2.toString();

  try {
    m += s1.split(".")[1].length;
  }

  catch (e) {

  }

  try {
    m += s2.split(".")[1].length;
  }

  catch (e) {

  }

  return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
}

function accDiv (arg1, arg2) {
  var t1 = 0, t2 = 0, r1, r2;

  try {
    t1 = arg1.toString().split(".")[1].length;
  }

  catch (e) {

  }

  try {
    t2 = arg2.toString().split(".")[1].length;
  }

  catch (e) {

  }

  r1 = Number(arg1.toString().replace(".", ""));
  r2 = Number(arg2.toString().replace(".", ""));

  return (r1 / r2) * Math.pow(10, t2 - t1);
}

checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);
