// "use client";
// import { HeaderContextProvider } from "@/app/ui/components/Header/HeaderContextProvider";
// import { ChakraProvider, extendTheme } from "@chakra-ui/react";

// const customTheme = extendTheme({
//   colors: {
//     app: "#1FFF69",
//     dark: "#0D1F23",
//   },
//   components: {
//     Modal: {
//       sizes: {
//         "2xl": {
//           dialog: {
//             maxWidth: "800px", // Set your custom width here
//             height: "auto", // Adjust height if needed
//           },
//         },
//         "2xlmini": {
//           dialog: {
//             maxWidth: "842px", // Set your custom width here
//             height: "auto", // Adjust height if needed
//           },
//         },
//         referral: {
//           dialog: {
//             maxWidth: "709px", // Set your custom width here
//             height: "auto", // Adjust height if needed
//           },
//         },
//         "3xl": {
//           dialog: {
//             maxWidth: "1000px", // Set your custom width here
//             height: "auto", // Adjust height if needed
//           },
//         },
//         "4xl": {
//           dialog: {
//             maxWidth: "1200px", // Set your custom width here
//             height: "auto", // Adjust height if needed
//           },
//         },
//       },
//     },
//     Drawer: {
//       sizes: {
//         "1xl": {
//           dialog: {
//             maxWidth: "672px", // Set your custom width here
//             height: "auto", // Adjust height if needed
//           },
//         },
//         "2xl": {
//           dialog: {
//             maxWidth: "800px", // Set your custom width here
//             height: "auto", // Adjust height if needed
//           },
//         },
//         "2xlmini": {
//           dialog: {
//             maxWidth: "842px", // Set your custom width here
//             height: "auto", // Adjust height if needed
//           },
//         },
//         "3xl": {
//           dialog: {
//             maxWidth: "1000px", // Set your custom width here
//             height: "auto", // Adjust height if needed
//           },
//         },
//         "4xl": {
//           dialog: {
//             maxWidth: "1200px", // Set your custom width here
//             height: "auto", // Adjust height if needed
//           },
//         },

//         "5xl": {
//           dialog: {
//             maxWidth: "1350px", // Set your custom width here
//             height: "auto", // Adjust height if needed
//           },
//         },
//         "6xl": {
//           dialog: {
//             maxWidth: "1450px", // Set your custom width here
//             height: "auto", // Adjust height if needed
//           },
//         },
//       },
//     },
//     Switch: {
//       baseStyle: {
//         track: {
//           _checked: {
//             bg: "#09418D", // Use the custom color here
//           },
//         },
//       },
//     },
//   },
//   zIndices: {
//     tooltip: 2000, // Custom zIndex for all tooltips
//   },
// });

// export function AppProvider({ children }: { children: React.ReactNode }) {
//   return (
//     <HeaderContextProvider>
//       <ChakraProvider theme={customTheme}>{children}</ChakraProvider>
//     </HeaderContextProvider>
//   );
// }
