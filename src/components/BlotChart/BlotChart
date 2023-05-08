import React from "react";
import { render, screen, waitForElementToBeRemoved, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlotChart from "./index";
import { describe, expect, beforeEach, afterEach, it } from "vitest";

describe("GameList Component", () => {
    beforeEach(() => {
        render(<BlotChart />);
    });
    it("renders BlotChart with a prompt", () => {
        const prompt = screen.getByRole("prompt");
        expect(prompt).toBeInTheDocument();
    }),
        it("renders BlotChart with a submit button", () => {
            const submitButton = screen.getByRole("submit-button");
            expect(submitButton).toBeInTheDocument();
        }),
        it("renders BlotChart with a chat button", () => {
            const chatButton = screen.getByRole("chat-button");
            expect(chatButton).toBeInTheDocument();
        }),
        it("renders BlotChart with a text input", () => {
            const textInput = screen.getByRole("text-input");
            expect(textInput).toBeInTheDocument();
        }),
        it("renders BlotChart with a image", () => {
            const image = screen.getByRole("image");
            expect(image).toBeInTheDocument();
        }),
        it("renders BlotChart with a next prompt", () => {
            const nextPrompt = screen.getByRole("next-prompt");
            expect(nextPrompt).toBeInTheDocument();
        }),
        it("updates image after user submits response", async () => {
            await waitForElementToBeRemoved(() =>
                screen.getByAltText("loading")
            );
            const input = screen.getByRole("textbox");
            const submitButton = screen.getByRole("button", { name: "Submit" });
            const initialImage = screen.getByAltText("Expression Exercise");
            fireEvent.change(input, {
                target: { value: "This is my response" },
            });
            fireEvent.click(submitButton);
            await waitForElementToBeRemoved(() =>
                screen.getByAltText("loading")
            );
            const newImage = screen.getByAltText("Expression Exercise");
            expect(newImage).not.toEqual(initialImage);
        });
});
