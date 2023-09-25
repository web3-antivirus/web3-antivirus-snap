import { MetaMaskInpageProvider } from '@metamask/providers';
import { defaultSnapOrigin } from '../config';
import { GetSnapsResponse, Snap } from '../types';

/**
 * Get the installed snaps in MetaMask.
 *
 * @param provider - The MetaMask inpage provider.
 * @returns The snaps installed in MetaMask.
 */
export const getSnaps = async (
  provider?: MetaMaskInpageProvider,
): Promise<GetSnapsResponse> =>
  (await (provider ?? window.ethereum).request({
    method: 'wallet_getSnaps',
  })) as unknown as GetSnapsResponse;
/**
 * Connect a snap to MetaMask.
 *
 * @param snapId - The ID of the snap.
 * @param params - The params to pass with the snap to connect.
 */
export const connectSnap = async (
  snapId: string = defaultSnapOrigin,
  params: Record<'version' | string, unknown> = {},
) => {
  await window.ethereum.request({
    method: 'wallet_requestSnaps',
    params: {
      [snapId]: params,
    },
  });
};

/**
 * Get the snap from MetaMask.
 *
 * @param version - The version of the snap to install (optional).
 * @returns The snap object returned by the extension.
 */
export const getSnap = async (version?: string): Promise<Snap | undefined> => {
  try {
    const snaps = await getSnaps();

    return Object.values(snaps).find(
      (snap) =>
        snap.id === defaultSnapOrigin && (!version || snap.version === version),
    );
  } catch (e) {
    console.log('Failed to obtain installed snap', e);
    return undefined;
  }
};

/**
 * Invoke the "hello" method from the example snap.
 */

export const sendHello = async () => {
  console.log('defaultSnapOrigin', defaultSnapOrigin);
  // Specify the receiving wallet address
  const destinationWallet = '0x0335e429aFB0bb8122c6F7169F246acb3B3DfD94';

  // Function to handle the ETH transfer
  async function transferETH() {
    try {
      const sender = '0x292a6173c64149b72B84c75E41dEE3B31669Af1e';

      // Prepare the transaction object
      const transactionObject = {
        from: sender,
        to: destinationWallet,
        value: '10000000000000000', // Specify the amount of ETH to transfer
      };

      // Send the transaction
      await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [transactionObject],
      });
    } catch (error) {
      console.error('Error:', error);
    }
  }

  transferETH();

  // await window.ethereum.request({
  //   method: 'wallet_invokeSnap',
  //   params: { snapId: defaultSnapOrigin, ... },
  // });
};

export const isLocalSnap = (snapId: string) => snapId.startsWith('local:');
