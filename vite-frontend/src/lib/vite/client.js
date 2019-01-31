import vite from "lib/vite";

const buildinTxBlock = vite.buildinTxBlock;

export const getAccountBlock = () => {
  return buildinTxBlock.asyncAccountBlock({
    blockType: 1,
    accountAddress: "vite_ffcca6ddaf12753c0fb5f41a7dfe4c166dcad0024a564be016"
  });
};

export const callContract = ({
  accountAddress,
  toAddress,
  abi,
  tokenId,
  amount,
  methodName
}) => {
  return buildinTxBlock.callContract({
    accountAddress,
    toAddress,
    abi,
    tokenId,
    amount,
    methodName
  });
};
