import { Image } from "native-base";

const Logo = () => {
  return (
    <>
      <Image
        source={require("../assets/pagatodologo.png")}
        alt="Alternate Text"
        size="xl"
      />
    </>
  );
};

export default Logo;
