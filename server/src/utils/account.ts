import { TAccountInput, ZAccountInput } from "../types/account"

export const filterAccountInputData = (account: Record<string, unknown>) => {
    const supportedProps = Object.keys(ZAccountInput.shape);
    return supportedProps.reduce<TAccountInput>((acc, prop) => {
      if (account.hasOwnProperty(prop)) {
        (acc as any)[prop] = account[prop];
      }
      return acc;
    }, {} as TAccountInput);
  };
  