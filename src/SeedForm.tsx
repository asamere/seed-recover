import React, { useState } from "react";
import { crypto } from '@shapeshiftoss/hdwallet-native'
interface FormState {
  email: string;
  password: string;
}

const { EncryptedWallet } = crypto
const cryptoEngine = new crypto.engines.WebCryptoEngine()

const getEncryptedWallet = () => {
  return new EncryptedWallet(cryptoEngine)
}

const decryptNativeWallet = async (
  email: string,
  password: string,
  encryptedWalletString: string,
): Promise<string | null> => {
  if (!email || !password)
    throw new Error('An email and password are required to decrypt the wallet.')
  if (!encryptedWalletString) throw new Error('An encryptedWallet is required for decryption.')
  try {
      const encryptedWallet = getEncryptedWallet()
      await encryptedWallet.init(email, password, encryptedWalletString)
      return encryptedWallet.decrypt()
  } catch (e) {
    throw new Error('Native wallet decryption failed: ' + e)
  }
}

const SeedForm: React.FC = () => {
  const [formData, setFormData] = useState<FormState>({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form data submitted: ", formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Password:
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default SeedForm;
