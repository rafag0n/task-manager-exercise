interface TextProps extends React.HTMLAttributes<HTMLHeadingElement | HTMLParagraphElement> {
  children: string;
}

export const Title = ({ children }: TextProps) => {
  return <h1 className="text-2xl font-bold">
    {children}
  </h1>
}

export const ListTitle = ({ children }: TextProps) => {
  return <h3 className="text-lg font-semibold mb-0">
    {children}
  </h3>
}

export const Paragraph = ({ children }: TextProps) => {
  return <p className="text-base text-gray-700 mb-0">
    {children}
  </p>
}

export const SmallParagraph = ({ children }: TextProps) => {
  return <p className="text-xs text-gray-700 mb-0">
    {children}
  </p>
}
