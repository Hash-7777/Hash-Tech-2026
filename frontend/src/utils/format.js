const nf = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });

export const money = (n) => `EGP ${nf.format(Number(n) || 0)}`;
