with open('packages/marketing/src/components/Footer/FooterMega.tsx', 'r') as f:
    if "badge && link.badge" in f.read():
        print("YES")
    else:
        print("NO")
