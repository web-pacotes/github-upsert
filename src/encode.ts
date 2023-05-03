import { runningOnTheWeb } from "./execution";

/**
 * Encodes a {@link Uint8Array} in a Base64 string. Deep down it checks if it's running on server-side (e.g., node) 
 * or on the web (e.g., browser), to provide compability with both execution environments.
 * If running on server-side, it uses {@link Buffer} API, else it uses {@link btoa} function.
 * 
 * @param bytes The array of bytes to encode in Base64
 * @returns The Base64 representation of the input byte array
 */
export function base64(bytes: Uint8Array): string {
    if (!runningOnTheWeb) {
        return Buffer.from(bytes).toString('base64');
    }

    return btoa(new TextDecoder('utf-8').decode(bytes));
}
