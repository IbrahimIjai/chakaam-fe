import { Tweet } from "react-tweet";




//TODO
//https://react-tweet.vercel.app/twitter-theme/advanced
//STUDY ADVANCE THEMEING TO ACHIEVE MOBILE RESPOSIVENESS

export const TweetPreview = ({tweetId}: {tweetId: string}) => {
  return (
    <>
      <Tweet id={tweetId} />
    </>
  );
};
